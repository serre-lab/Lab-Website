const e=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>HMDB51: Human Motion Database</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { --ink:#0b1220; --muted:#6b7280; --border:#e5e7eb; --pill:#eef2ff; --link:#0b66ff; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.55; color:var(--ink); margin:2rem; }
    h1, h2, h3 { line-height:1.25; }
    .pill { display:inline-block; padding:.15rem .55rem; border-radius:999px; background:var(--pill); color:#334155; font-size:.85rem; margin-left:.4rem; }
    a { color:var(--link); text-decoration:none; }
    a:hover { text-decoration:underline; }
    .cards { display:grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap:1rem; }
    .card { border:1px solid var(--border); border-radius:12px; padding:1rem; }
    .muted { color:var(--muted); }
    ul { margin-top:.5rem; }
    code { background:#f6f8fa; padding:.1rem .35rem; border-radius:4px; }
    footer { margin-top:2rem; font-size:.9rem; color:#475569; }
  </style>
</head>
<body>

  <header>
    <h1>HMDB51: A Large Video Database for Human Motion Recognition <span class="pill">Official</span></h1>
    <p>HMDB51 contains <strong>6,849</strong> short video clips across <strong>51 action categories</strong>, compiled from movies and web videos to capture diverse viewpoints, camera motion, and visual conditions.</p>
  </header>

  <section id="downloads">
    <h2>Downloads</h2>
    <div class="cards">
      <div class="card">
        <h3>Video Database</h3>
        <ul>
          <li><a href="https://drive.google.com/uc?export=download&id=17anw5Oxp7lmp9cMwXPOyOpL5olDLmPpj">HMDB51 (original, unstabilized)</a> — about 2 GB; 51 classes, 6,849 clips.</li>
          <li><a href="https://drive.google.com/uc?export=download&id=1TyCwgNSzms7VU6-Mc64RTgwd8Zd9ynxy">HMDB51 (stabilized)</a> — same clips and labels, with geometric frame alignment; each clip includes a mask file <code>[video_name].form</code> readable in MATLAB.</li>
          <li><a href="https://drive.google.com/uc?export=download&id=1NQxJWJSYWefyNS-LFYCenFih4gRDUPCX">Train/Test splits (3 lists)</a> — predefined lists for Split 1–3 (used for standard evaluation).</li>
        </ul>
        <p class="muted">License: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
      </div>

      <div class="card">
        <h3>Community Mirrors and Tools</h3>
        <ul>
          <li><a href="https://docs.pytorch.org/vision/main/generated/torchvision.datasets.HMDB51.html">Torchvision: <code>datasets.HMDB51</code></a></li>
          <li><a href="https://mmaction2.readthedocs.io/en/latest/user_guides/prepare_dataset.html">MMAction2: dataset preparation</a></li>
          <li><a href="https://huggingface.co/datasets/jili5044/hmdb51">Hugging Face: HMDB51</a></li>
          <li><a href="https://huggingface.co/datasets/MichiganNLP/hmdb">Hugging Face: HMDB (ZIP repack)</a></li>
          <li><a href="https://datasets.activeloop.ai/docs/ml/datasets/hmdb51-dataset/">Activeloop Hub: HMDB51</a></li>
        </ul>
        <p class="muted">Additional community mirrors provided for convenience.</p>
      </div>
    </div>
  </section>

  <section id="classes">
    <h2>Action Classes (51)</h2>

    <h3>General facial actions</h3>
    <ul><li>smile, laugh, chew, talk</li></ul>

    <h3>Facial actions with object manipulation</h3>
    <ul><li>smoke, eat, drink</li></ul>

    <h3>General body movements</h3>
    <ul><li>cartwheel, clap hands, climb, climb stairs, dive, fall on the floor, backhand flip, handstand, jump, pull up, push up, run, sit down, sit up, somersault, stand up, turn, walk, wave</li></ul>

    <h3>Body movements with object interaction</h3>
    <ul><li>brush hair, catch, draw sword, dribble, golf, hit something, kick ball, pick, pour, push something, ride bike, ride horse, shoot ball, shoot bow, shoot gun, swing baseball bat, sword exercise, throw</li></ul>

    <h3>Human–human interaction</h3>
    <ul><li>fencing, hug, kick someone, kiss, punch, shake hands, sword fight</li></ul>
  </section>

  <section id="meta">
    <h2>Meta-Labels and Statistics</h2>
    <p>Each clip includes an action label and additional meta-labels describing:</p>
    <ul>
      <li><strong>Visible body parts:</strong> head (<code>h</code>), upper body (<code>u</code>), full body (<code>f</code>), lower body (<code>l</code>)</li>
      <li><strong>Camera motion:</strong> motion (<code>cm</code>) vs. static (<code>nm</code>)</li>
      <li><strong>Camera viewpoint:</strong> front (<code>fr</code>), back (<code>ba</code>), left (<code>le</code>), right (<code>ri</code>)</li>
      <li><strong>Number of people:</strong> one (<code>np1</code>), two (<code>np2</code>), three (<code>np3</code>)</li>
      <li><strong>Video quality:</strong> good (<code>goo</code>), medium (<code>med</code>), bad (<code>bad</code>)</li>
    </ul>
  </section>

  <section id="stabilization">
    <h2>Video Stabilization</h2>
    <p>The stabilized version reduces camera and background motion by matching visual features between adjacent frames and using RANSAC to estimate a geometric transform. Frames are then warped for alignment. Each clip includes a mask file (<code>.form</code>) specifying background regions used during alignment.</p>
  </section>

  <section id="citation">
    <h2>Citation</h2>
    <p>Kuehne, H., Jhuang, H., Garrote, E., Poggio, T., &amp; Serre, T. (2011). <em>HMDB: A Large Video Database for Human Motion Recognition.</em> ICCV.<br>
      <a href="/papers/Kuehne_etal_ICCV2011.pdf">PDF</a> ·
      <a href="/papers/Kuehne_etal_iccv11.bib">BibTeX</a>
    </p>
  </section>

  <footer>
    <p>Some third-party mirrors report counts such as <em>6,766</em> or "~7,000" videos. Differences arise from historical packaging, pruning, or mirror conversions. The official count is <strong>6,849</strong>.</p>
  </footer>

</body>
</html>`;export{e as default};
