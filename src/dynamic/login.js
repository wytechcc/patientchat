/*
  index.js (HTML Counterpart)
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  Contains dynamic JavaScript elements for Telecom Web App


  Table of Contents
  =================
  1.) Navigation
  2.) Authentication
  3.) Login Button
*/



/*
  1.) Navigation
*/
function servePage(pageref)
{
  // viewed at http://localhost:3000 + pageref
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + pageref));
  });
};


/*
  3.) Login Button
*/
const buttonLogin = document.getElementById('buttonLogin')
buttonLogin.addEventListener('click', function(e) 
{
  //  TODO:  Add second 
  servePage('/src/client.html')
});
