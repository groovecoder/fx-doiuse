#doiuse
Lint CSS for browser support against caniuse database; using doiuse library

![fx-doiuse
demo](https://raw.github.com/groovecoder/fx-doiuse/master/demo.gif)

## Usage
For now, this is a clunky prototype

1. Install `doiuse` globally so the binary is available to the add-on:

        npm install -g doiuse

2. Sym-link `node` into `/usr/bin/` so `doiuse` can find `node`

        sudo ln -s /usr/local/bin/node /usr/bin/node

3. `jpm run` to run Firefox with the add-on:

        cd fx-doiuse
        jpm run [-p fx-doiuse]

4. Open the Developer Tools "doiuse" panel

5. Set your Development Domains

6. Go to one of your development domains

You will get an alert for each stylesheet on the page, showing all of the CSS
incompatibilities as reported by `doiuse`.

## Dev Setup
Add-on coding can be a bit tricky. There are great docs on MDN for Add-ons and
the Add-on SDK. But they may be more than you need to work on this. So here's a
tl;dr version ...

1. (Suggested) [Create a new profile](https://support.mozilla.org/kb/profile-manager-create-and-remove-firefox-profiles) for fx-doiuse

2. Set these [recommended about:config](https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Recommended_development_preferences) values in the profile:

        devtools.chrome.enabled = true
        devtools.debugger.remote-enabled = true
        xpinstall.signatures.required = false

3. [Install jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation) on your machine

4. Clone this repo:

        git clone git://github.com/groovecoder/fx-doiuse.git

5. `jpm run` to run Firefox with the add-on:

        cd fx-doiuse
        jpm run [-p fx-doiuse]

We use `browserify` to bundle `postcss` and `doiuse` into `fx-doiuse`. To
browserify the `doiuse-script.js` into `data/doiuse-bundle.js` ...

1. Install `browserify`, `postcss`, and `brfs`:

        npm install browserify postcss brfs

2. Clone a special branch of doiuse into the `node_modules`:

        cd node_modules
        git clone https://github.com/groovecoder/doiuse.git
        cd doiuse
        git checkout require-fulldata

3. Run `browserify`:

        ./node_modules/.bin/browserify -t brfs -r doiuse -r postcss data/doiuse-script.js -o data/doiuse-bundle.js


## What's next?

See [Issues](https://github.com/groovecoder/fx-doiuse/issues) for the planned features.

## Credits

Icons by [Hand-Drawn Goods Brainy Icons
Free](http://handdrawngoods.com/store/brainy-icons-free/)
