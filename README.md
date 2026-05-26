# LCA Maths Practice

Static HTML, CSS and JavaScript learning pages for Leaving Certificate Applied Mathematical Applications.

## Open the site

You can open `index.html` directly. The pages include a bundled copy of the JSON content so this works from a normal folder.

For live JSON loading while editing, use a local web server. The easiest option on Windows is to open `Open LCA Maths Practice.cmd`.

If the local server is already running, open:

`http://127.0.0.1:4173/`

## Content structure

- `data/topics.json` controls the topic list on the home page and side navigation.
- `data/facts/*.json` holds each topic's rules, worked examples, curriculum links and activity list.
- `data/exam-bank.json` controls the exam practice page and question-type mix.
- `js/question-generators.js` creates fresh numbers for interactive practice.
- `js/app.js` renders the topic pages from JSON.
- `js/exam.js` renders the interactive and printable exam practice page.

## Adding material

For most lesson updates, edit the matching file in `data/facts/`.

Each rule can include:

- `title`
- `explanation`
- `formula`
- `steps`
- `examples`

To add a new interactive question type, add it to `js/question-generators.js`, then reference the generator id in the topic JSON or `data/exam-bank.json`.

If you edit the JSON files and want the pages to keep working when opened directly from the folder, run `Update Data Bundle.cmd`.
