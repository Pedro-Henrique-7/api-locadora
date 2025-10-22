
function showMessage (){
    
const itsWorking = `
███████╗ █████╗ ██████╗ ██╗
██╔════╝██╔══██╗██╔══██╗██║
█████╗  ███████║██║  ██║██║
██╔══╝  ██╔══██║██║  ██║██║
██║     ██║  ██║██████╔╝███████╗
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝

[ SYSTEM LOG ] =============================
> Initializing API Core...
> Connecting to database... OK
> Loading endpoints... OK
> Authentication modules... OK
> Launch sequence initiated ✅

⚡ STATUS: API IS RUNNING ⚡
---------------------------------------------
Listening on: http://localhost:8080/v1/locadora
Press CTRL+C to abort.
---------------------------------------------

> Awaiting incoming requests...
> Hack the planet 🌐
`
return itsWorking

}


module.exports = {
    showMessage
}