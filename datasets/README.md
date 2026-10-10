# Dataset files

This directory does not currently contain dataset archives. The only tracked file here is this README.

`npm` has no dataset download or migration scripts. Large archives dropped into this folder (`.rar`, `.tar.bz2`, `.zip`, `.tar.gz`) are gitignored and are not part of the site build. None of those files are present.

## What the site actually serves

| Dataset | Where the page lives | Where the files are |
|---------|----------------------|---------------------|
| HMDB51 | `public/hmdb51.html` (standalone page at `/hmdb51.html`) | External downloads linked from that page (Google Drive, plus community mirrors). Preview images are in `public/images/resources/hmdb/`. |
| Breakfast Actions | `public/breakfast-actions-dataset.html` at `/breakfast-actions-dataset.html`, and the hash route `/#/resources/the-breakfast-actions-dataset` | External downloads (Google Drive, Dropbox, Hugging Face). Not stored in this directory. |
| Multi-cue boundary detection | Hash route `/#/resources/the-multi-cue-boundary-detection-dataset` | Hugging Face (`Serrelab/multicue-boundary-detection`). Preview images are in `public/images/resources/multicue/`. The archive is not in this repo. |

## Rodent behavioral phenotyping

The markdown page `/#/resources/automated-system-for-rodent-behavioral-phenotyping` links to:

- `/datasets/rodent/clipped_database.zip`
- `/datasets/rodent/full_database.zip`

Those files are not in this repository and are not in `public/datasets/`. Opening the links returns a missing file. There is no copy here to publish, and this README does not point at another server that is assumed to still host them.

The same page links the system source code to `http://cbcl.mit.edu/software-datasets/mouse/`. That is a separate code link, not the missing zip archives.
