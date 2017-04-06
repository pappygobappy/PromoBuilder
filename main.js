const {app, Menu, BrowserWindow} = require('electron')

let win = null;

const {ipcMain} = require('electron')

const template = [{
  label: 'File',
  submenu:[{
    label:'Create Promotional',
    click () { 
      win.webContents.send('asynchronous-message', 'createPromotional');
    }
  }]
}]


ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  // Specify entry point
  win.loadURL('http://localhost:4200');
  //win.loadURL(`file://${__dirname}/dist/index.html`);


  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});