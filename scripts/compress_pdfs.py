#!/usr/bin/env python3
"""
Compress the publication PDFs in public/papers/ with Ghostscript.

Safe-by-construction: each PDF is compressed to a temp file, then the result
replaces the original ONLY if it (a) is a valid PDF, (b) has the same page
count, (c) still has extractable text (guards against figures being rasterised
into an image-only file), and (d) is meaningfully smaller. Otherwise the
original is kept untouched. Originals are also in git, so nothing is lost.

Usage:
  python3 scripts/compress_pdfs.py [--dry-run] [--quality ebook|screen|printer]
"""
import argparse
import shutil
import subprocess
import sys
from pathlib import Path

PAPERS = Path(__file__).parent.parent / "public" / "papers"
MIN_SAVING = 0.05  # only keep compressed copy if >=5% smaller


def page_count(pdf: Path) -> int:
    try:
        out = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, timeout=60).stdout.decode("utf-8", "ignore")
        for line in out.splitlines():
            if line.lower().startswith("pages:"):
                return int(line.split(":")[1].strip())
    except Exception:
        pass
    return -1


def text_len(pdf: Path) -> int:
    try:
        out = subprocess.run(["pdftotext", str(pdf), "-"], capture_output=True, timeout=120).stdout
        return len(out.strip())
    except Exception:
        return 0


def compress(src: Path, dst: Path, quality: str) -> bool:
    cmd = [
        "gs", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.5",
        f"-dPDFSETTINGS=/{quality}", "-dNOPAUSE", "-dQUIET", "-dBATCH",
        "-dDetectDuplicateImages=true", "-dAutoRotatePages=/None",
        f"-sOutputFile={dst}", str(src),
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, timeout=600)
        return r.returncode == 0 and dst.exists() and dst.stat().st_size > 0
    except Exception as e:
        print(f"  gs error: {e}", file=sys.stderr)
        return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--quality", default="ebook", choices=["ebook", "screen", "printer"])
    args = ap.parse_args()

    pdfs = sorted(PAPERS.glob("*.pdf"))
    tmpdir = PAPERS / "_compress_tmp"
    tmpdir.mkdir(exist_ok=True)

    total_before = total_after = 0
    shrunk = skipped = failed = 0
    for pdf in pdfs:
        before = pdf.stat().st_size
        total_before += before
        tmp = tmpdir / pdf.name
        orig_pages = page_count(pdf)
        orig_text = text_len(pdf)

        if not compress(pdf, tmp, args.quality):
            print(f"FAIL   {pdf.name} (gs failed, kept original)")
            failed += 1
            total_after += before
            tmp.unlink(missing_ok=True)
            continue

        after = tmp.stat().st_size
        new_pages = page_count(tmp)
        new_text = text_len(tmp)

        # Validity gates
        bad = []
        if new_pages != orig_pages:
            bad.append(f"pages {orig_pages}->{new_pages}")
        if orig_text > 200 and new_text < orig_text * 0.5:
            bad.append(f"text {orig_text}->{new_text} (rasterised?)")
        if bad:
            print(f"KEEP*  {pdf.name}: {', '.join(bad)} — kept original")
            skipped += 1
            total_after += before
            tmp.unlink(missing_ok=True)
            continue

        saving = 1 - after / before
        if saving >= MIN_SAVING:
            print(f"SHRINK {pdf.name}: {before/1e6:.1f}MB -> {after/1e6:.1f}MB ({saving*100:.0f}% smaller)")
            if not args.dry_run:
                shutil.move(str(tmp), str(pdf))
            else:
                tmp.unlink(missing_ok=True)
            shrunk += 1
            total_after += after
        else:
            print(f"keep   {pdf.name}: only {saving*100:.0f}% — kept original")
            skipped += 1
            total_after += before
            tmp.unlink(missing_ok=True)

    shutil.rmtree(tmpdir, ignore_errors=True)
    print("\n" + "=" * 60)
    print(f"Files: {len(pdfs)} | shrunk: {shrunk} | kept: {skipped} | failed: {failed}")
    print(f"Total: {total_before/1e6:.0f}MB -> {total_after/1e6:.0f}MB "
          f"({(1-total_after/total_before)*100:.0f}% smaller)"
          + ("  [DRY RUN — nothing written]" if args.dry_run else ""))


if __name__ == "__main__":
    main()
