// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
let http = require('http');
let url = require('url');

let callbackServer = http.createServer(function (req, res) {
    console.log(req.socket.localPort);
    if(req.url.startsWith('/github-oauth-callback?')) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'accept': 'application/json'
        });
        let data = url.parse(req.url, true).query;
        res.write('URL: ' + req.url);
        res.write('Data: ' + data.code);
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("Not Found");
    }
});

callbackServer.listen(0, 'localhost', function() {
    console.log('opened server on', callbackServer.address().port);
});


function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.