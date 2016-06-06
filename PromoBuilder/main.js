'use strict';
//script('js/jspdf.debug.js')

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const shell = require('shell')
var pdfkit = require('pdfkit');
var certs = require('./js/certificateData.js')
const fs = require('fs');

var ipc = electron.ipcMain
var folder = ""
ipc.on('folder', function (event, arg) {
  folder = arg
  console.log(arg)
});

function addCertificate(student, promo, doc, width, height){
  doc.image("./img/promotionalCertificate.jpg", -15, -25, {fit: [650, 830]});
  doc.fontSize(20);
  //doc.moveTo(0, 20).lineTo(612, 20).stroke()  
  //doc.moveTo(20, 0).lineTo(20, 792).stroke() 
  doc.text(student.firstname+" "+student.lastname, 70, 328, {align:"center"});
  doc.text(student.applications[promo.$id].testrank+" "+student.applications[promo.$id].kyudan+" "+student.applications[promo.$id].testcolor+" Belt", 67, 395, {align:"center"});
  doc.fontSize(14);
  //console.log(promo.date)
  doc.text(promo.date, -122, 455, {align:"center"});
  doc.text("Sue Miller, Nobu Kaji", -158, 500, {align:"center"});
  doc.text("10th Dan", 282, 525, {align:"center"});
}

ipc.on('certificates', function (event, students, promo, tab) {
  var path = ""
  if (process.platform == 'win32')
    path = app.getPath("documents")+"\\PromoBuilder\\"+folder+"\\"
  else
    path = app.getPath("documents")+"/PromoBuilder//"+folder+"/"
  if(!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  var doc = new pdfkit
  doc.pipe(fs.createWriteStream(path+tab.tab+" Certificates.pdf"))
  //var page = doc.addPage();
  var width = 600; 
  //console.log(page.height)   
  var height = 1000;
  for (var i = 0, len = students.length; i < len; i++) {
    addCertificate(students[i], promo, doc, width, height);
    if(i < len-1)
      doc.addPage({size:"letter"});
  }
  //doc.save()
  doc.end()
  shell.openItem(path+tab.tab+" Certificates.pdf");
  //doc.save(tab.tab+" Certificates.pdf");
});




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 700, icon: "img/shinkyushotokan.jpg", title:"PromoBuilder"});

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
