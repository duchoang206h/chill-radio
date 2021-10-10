

let auth0 = null;

const configureClient = async () => {
    auth0 = await createAuth0Client({
      domain:'dev-l3e3wo29.us.auth0.com' ,
      client_id: 'OA7yjrrK3x8Ku9LueVdJ9EL9q6PscE9h'
    });
  };

 let loadd= async() => {
    await configureClient()
    console.log("load xong ");
    updateUI();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        // show the gated content
        return;
    }

    // NEW - check for the code and state parameters
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {

        // Process the login state
        try {
            await auth0.handleRedirectCallback();
        } catch (error) {
            console.log(error)
        }


        updateUI();

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
    }
}
loadd();
const login = async() => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    });
}

const logout = async() => {
    auth0.logout({
        returnTo: window.location.origin
    });
}

const updateUI = async() => {
    const isAuthenticated = await auth0.isAuthenticated();
    if(isAuthenticated){
        const user = await auth0.getUser();
        document.getElementById('userImg').src = user.picture;
        document.getElementById('userName').innerText+=user.name;
        document.getElementById('user').style.display="flex";
    }
}
async function addtoplaylist(){
    // check author
    const isAuthenticated = await auth0.isAuthenticated()  ;
    if(isAuthenticated){
      
      $('#search').css("display",'block');
    }else{
      console.log("not login");
      document.getElementById('login').style.display ='block';
    }
    
  }