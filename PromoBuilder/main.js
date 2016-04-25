'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const shell = require('shell')

var ipc = electron.ipcMain
var folder = ""
ipc.on('folder', function (event, arg) {
  folder = arg
  console.log(arg)
});





// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: "img/shinkyushotokan.jpg", title:"PromoBuilder"});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');


  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.webContents.session.on('will-download', function(event, item, webContents) {
    var path = ""
    if (process.platform == 'win32')
      path = app.getPath("documents")+"\\PromoBuilder\\"+folder+"\\"
    else
      path = app.getPath("documents")+"/PromoBuilder//"+folder+"/"
    item.setSavePath(path+item.getFilename());
    /*console.log(path+item.getFilename());
    console.log(item.getFilename());
    console.log(item.getTotalBytes());
    item.on('updated', function() {
      console.log('Received bytes: ' + item.getReceivedBytes());
    });*/
    item.on('done', function(e, state) {
      if (state == "completed") {
        //console.log("Download successfully");
        //localStorage.setItem("test", "poop")
        //dialog.showOpenDialog(mainWindow, {title: item.getFilename(), defaultPath: '~/Desktop/tmp/'})
        shell.openItem(path+item.getFilename());
      } else {
        //console.log("Download is cancelled or interrupted that can't be resumed");
      }
    });
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
