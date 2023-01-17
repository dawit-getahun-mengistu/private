

function toProfile(){
    location.assign('../profile.html')
}


function dropdownHamburger(){
    let reference = document.getElementById("dropdown");
    reference.classList.toggle("show");
 
}

// class for user objects
class user{
    constructor (name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
        this.age=null;
        this.nationality=null;
        this.phone=null;
    }
}

// variable to store current user
let currentUser = JSON.parse(localStorage.getItem('curr'));

//validate to sign up
function validateSignUp(e){
    event.preventDefault();

    let password = document.getElementById('sign-up-password').value;
    let confirm = document.getElementById('confirm-password').value;
    
    let agreeToTerms = document.getElementById('agree-to-terms');
    if(password.length < 8){
        let pass_req = document.getElementById('password-requirement');
        pass_req.style.color='red';
        return
    }
    
    if (password !== confirm){
        let pass_err = document.getElementById('password-mismatch');
        pass_err.innerHTML='passwords do not match';
        pass_err.style.color='red';
        pass_err.style.fontSize='xx-small';      
        return;
    }
    let name = document.getElementById('sign-up-name').value;
    let email = document.getElementById('sign-up-email').value;
    if (!(agreeToTerms.checked)){
        let err = document.getElementById('error-output');
        err.innerHTML='please read and agree to terms of service';
        err.style.color='red';
        err.style.fontSize='xx-small';
        return
    }else{
        if (validateEmail(email)){
        
            if (localStorage.getItem(email) == null){
                let newUser = new user(name,email,password);
                let userString = JSON.stringify(newUser);
                localStorage.setItem(email,userString);
                localStorage.removeItem('curr');
                localStorage.setItem('curr',userString); // store the current user
                alert('successfully signed up');
                location.assign('../destination.html');
                localStorage.setItem('signedIn',true);//store user status
                return;
            }else{
                alert('Account aleady exists with this email');
                return;
            }
            
        }
    }
    

}
// helper function to validate email
function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}


// validate to sign in
function validateSignIn(e) {
    event.preventDefault();

    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    let userString = localStorage.getItem(email);
    let signingInUser = JSON.parse(userString);
    if(currentUser!= null){
        alert('you are already signed in')
        location.assign('../destination.html')
        return
    }
    else if(!validateEmail(email)){
        alert('invalid email')
        return
    }
    else if(signingInUser == null){
        alert('user by that email does not exist');
        return;
    }
    else if(signingInUser.password === password){
        localStorage.removeItem('curr');
        localStorage.setItem('curr',userString);//store current user
        localStorage.setItem('signedIn',true);//store user status
        alert('You are successfully signed-in');
        location.assign('../destination.html');
        
    }
    else{
        alert('password and email do not match');
    }
}


//log-out function
function logOut(e){
    event.preventDefault();

    localStorage.removeItem('curr');
    currentUser = null;
    localStorage.removeItem('signedIn');
    localStorage.setItem('signedIn',false); //update user status
    // window.location.replace('home.html');
    location.assign('../home.html')
    return
}


//validate user info change
function validateUserInfoChange(e){
    event.preventDefault();
    let newName = document.getElementById('change-name').value;
    let newNationality = document.getElementById('change-nationality').value;
    let newAge = document.getElementById('change-age').value;
    let newEmail = document.getElementById('change-email').value;
    let newPhone = document.getElementById('change-phone').value;

    if ((newName!=null) && (newNationality!=null) && (newAge!=null) && (newEmail!=null) && (newPhone!=null)){
        let currEmail = currentUser.email;
        localStorage.removeItem(currEmail);

        currentUser.email = newEmail;
        currentUser.name = newName;
        currentUser.nationality = newNationality;
        currentUser.age = newAge;
        currentUser.phone = newPhone;

        let stringUser = JSON.stringify(currentUser);
        localStorage.setItem('curr',stringUser);

        location.assign('../home.html')
        return
    }else{
        alert('please fill in all fields')
        return
    }


}


// change password
function validatePasswordChange(e){
    event.preventDefault();
    let currPassword = document.getElementById('change-current-password').value;
    let newPassword = document.getElementById('change-new-password').value;
    let confPassword = document.getElementById('change-confirm-password').value;

    if (currPassword == currentUser.password){
        if (newPassword === confPassword){
            currentUser.password=newPassword;
            let stringUser = JSON.stringify(currentUser);
            localStorage.setItem('curr',stringUser);
            location.assign('../home.html')
        }else{
            alert('password mismatch')
            return;
        }

    }else{
        alert('wrong password detected')
        return
    }
}

// unimplemented features alert
function unimplementedFeature(){
    alert("This feature is not implemented because it requires server-side implementation.")
    return;
}