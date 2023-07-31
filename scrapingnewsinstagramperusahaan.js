const path = require('path'); 
const puppeteer = require('puppeteer');   
const replace = require("replace");
const sleep = require('util').promisify(setTimeout);     
async function startBrowser() {  
const browser = await puppeteer.launch({
    args: ['--no-sandbox'],   
    timeout: 10000,
  });
  const page = await browser.newPage(); 
  return {browser, page};
}
async function playTest(url) {
  const {browser, page} = await startBrowser(); 
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);                
  await sleep(2000);
  var dataa = ""; 
  const post_caption = await page.evaluate(() => {       
    const postcaption = document.querySelector(".post_caption");       
    return postcaption.innerHTML;             
  });
  await sleep(2000);
  if(post_caption.trim()=="") {
    console.log('datanyakosong');
  }
  else {
    const post_thumbnail = await page.evaluate(() => {        
      const postthumbnail = document.querySelector(".post_thumbnail");       
      return postthumbnail.innerHTML;      
    });
    var post_thumbnail2 = post_thumbnail.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    var post_thumbnail2 = post_thumbnail2.replace("amp;","");
    dataa += post_thumbnail2+"|pisah|";   
    const post_caption = await page.evaluate(() => {       
      const postcaption = document.querySelector(".post_caption");       
      return postcaption.innerHTML;             
    });
    dataa += post_caption+"|pisah|";  
    const post_link = await page.evaluate(() => {       
      const postlink = document.querySelector(".post_link");       
      return postlink.innerHTML;             
    });
    dataa += post_link+"|pisah|";
    console.log(dataa);
  }
  // if(checkcaption > 0) {
  //   console.log('datanyakosong');
  // }
  // else {
    // console.log(dataa);
  // }
  // console.log(checkcaption);
}
(async () => {
  await playTest("https://domainweb.com/scrapingnewsinstagramperusahaan.php");
  process.exit(1);        
})();   