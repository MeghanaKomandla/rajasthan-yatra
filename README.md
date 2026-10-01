# Rajasthan Yatra

A travel guide website for all 41 districts of Rajasthan: famous places, food, clothes, traditions, history, days needed, distances, railway stations, bus stands and local transport, with photos.

It is a plain static website (HTML, CSS and JavaScript). No build step, no server code and no database, so it runs anywhere.

```
rajasthan-yatra/
├── index.html        the page
├── css/style.css     colours, fonts, layout
├── js/data.js        ALL district content: places, food, history, transport…
├── js/photos.js      which Wikipedia article each place's photo comes from
├── js/app.js         how the site works (map, search, distances, editor)
├── images/           put your own photos here
└── .vscode/          recommended VS Code extensions and settings
```

---

## 1. Open it in VS Code

1. Install **VS Code** from https://code.visualstudio.com (free).
2. Unzip `rajasthan-yatra.zip` somewhere easy, such as `Documents/rajasthan-yatra`.
3. In VS Code: **File → Open Folder…** and choose the `rajasthan-yatra` folder.
4. VS Code will offer to install the recommended extensions. Click **Install** (this gets *Live Server*).
   If it doesn't ask: open the Extensions panel (Ctrl+Shift+X), search **Live Server** by Ritwick Dey, and install it.
5. Right-click `index.html` → **Open with Live Server**.
   The site opens at `http://127.0.0.1:5500` and reloads every time you save a file.

You need an internet connection for the Wikipedia photos and the Google fonts. Without one the site still works and shows the drawn illustrations.

---

## 2. How the photos work

For each place the site shows the main photo from that place's own Wikipedia article
(for example *Hawa Mahal* → https://en.wikipedia.org/wiki/Hawa_Mahal), so the photo matches the place.

The order it tries:

1. **Your own photo**, if you set one (see below).
2. **The exact Wikipedia article** listed in `js/photos.js`.
3. **A Wikipedia search** for the place name + district. These are marked “closest match”. Check them.
4. **A drawn illustration**, if nothing is found or you're offline.

Tap the small “Photo: Wikipedia” label on a photo to open its source page, which shows the photographer and licence.
Most are Creative Commons; keep the credit visible if you publish the site.

### Fix a wrong photo

* **Quick way:** on the website, open the district, press **Change photo** under the place, and paste an image link or upload a photo.
* **Using Wikipedia:** open `js/photos.js` and set the right article title, e.g. `"Neemrana Baori":"Neemrana Baori",`
* **Using your own file:** copy the photo into `images/` (e.g. `images/neemrana-baori.jpg`) and add it to the place in `js/data.js`:

```js
["Neemrana Baori","stepwell",50,"45 min","Nine-storey 18th-century stepwell…", {img:"images/neemrana-baori.jpg"}]
```

Keep photos under about 300 KB (1200 px wide JPG) and use lowercase names without spaces.

---

## 3. Add or edit places

### Option A: on the website (no coding)

* Open any district → **+ Add a place** or **+ Add a dish**. Fill in name, type, km from town, time to spend, description and an optional photo.
* Places you added get **Edit** and **Delete** buttons. Built-in places get **Change photo**.
* The **My edits** section (top menu) lets you add to any district, see everything you've changed, and export it.

These edits are saved **in your browser only**. Visitors won't see them until you make them permanent:

1. Go to **My edits → Download data.js**.
2. Replace `js/data.js` in your project with the downloaded file.
3. Back on the site, press **Clear all edits** so nothing appears twice.
4. Redeploy (section 5). Now everyone sees your new places.

Tip: if you uploaded photos in the browser, they get stored inside data.js and make it large. For a public site, put photos in `images/` and use the path instead.

### Option B: edit `js/data.js` directly

Each district looks like this:

```js
{id:"jaipur", n:"Jaipur", div:"jaipur", lat:26.912, lng:75.787, tone:"pink",
 tag:"The Pink City: …", hist:"…", days:"2–3 days", best:"Oct – Mar",
 rail:"…", bus:"…", air:"…", local:"…", wear:"…", trad:"…", shop:"…",
 places:[
   // [name, type, km from district town, time to spend, description, {img} optional]
   ["Amer Fort","fort",11,"3 hrs","Hilltop palace-fort …"],
 ],
 food:[
   // [name, kind, description, {img} optional]
   ["Dal Baati Churma","thali","Baked wheat balls …"],
 ]},
```

* **Place types:** `fort palace lake temple jain dunes wild haveli stepwell falls mosque garden hill ruins border`
* **Food kinds:** `thali sweet fried curry drink bread snack`
* **tone** (colour of the drawn buildings): `pink blue gold white sand red`
* `lat`/`lng` are the district town's coordinates. They place the dot on the map and are used for distances.

To add a place, copy an existing line, change it, and keep the comma between lines. Save, and Live Server reloads the page.
If the page goes blank, you probably missed a comma or a quote: press F12 in the browser, open **Console**, and it will show the line number.

---

## 4. Check it on your phone

While Live Server is running, find your computer's local IP address (Windows: `ipconfig`, Mac: System Settings → Wi-Fi → Details).
On a phone on the same Wi-Fi, open `http://YOUR-IP:5500`.

---

## 5. Put it on the internet (free)

### Netlify Drop: easiest, about 1 minute
1. Go to https://app.netlify.com/drop and sign up (free).
2. Drag the whole `rajasthan-yatra` **folder** onto the page.
3. You get a link like `https://rajasthan-yatra-123.netlify.app`. Rename it in **Site configuration → Change site name**.
4. To update: open the site in Netlify → **Deploys** → drag the folder again.

### GitHub Pages: best if you'll keep editing
1. Create a free account at https://github.com and click **New repository**. Name it `rajasthan-yatra`, set it to **Public**, and create it.
2. Click **uploading an existing file** and drag in everything *inside* the folder (index.html, css, js, images…). Click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute your site is at `https://YOUR-USERNAME.github.io/rajasthan-yatra/`.

Updating from VS Code with Git (optional):

```bash
git init
git add .
git commit -m "Rajasthan Yatra"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rajasthan-yatra.git
git push -u origin main
```

After that, every change is: edit → `git add .` → `git commit -m "Added places"` → `git push`. The site updates in about a minute.
(VS Code's **Source Control** panel, Ctrl+Shift+G, does the same with buttons.)

### Vercel
1. Push the folder to GitHub as above.
2. At https://vercel.com click **Add New → Project**, import the repository, leave every setting as it is, and click **Deploy**.

### Your own domain
Buy a domain (GoDaddy, Hostinger, Namecheap…) and add it in Netlify (**Domain management**), GitHub Pages (**Settings → Pages → Custom domain**) or Vercel (**Settings → Domains**). Each one shows the DNS records to copy into your domain provider.

---

## 6. Common questions

**Photos don't show, only drawings.** Check your internet connection. Some office or school networks block Wikipedia. Your own photos in `images/` always work.

**My added places disappeared.** Browser edits are stored per browser. Clearing browser data or switching browser/device loses them. Use **My edits → Download edits (.json)** as a backup, and **Import** to restore.

**Change colours or fonts.** Edit the variables at the top of `css/style.css` (`--indigo`, `--marigold`, `--rani`, …).

**Distances look off.** Road distances are estimated from straight-line distance × 1.22. Check Google Maps for exact routes.
