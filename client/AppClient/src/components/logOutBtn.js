export const LogOutBtn = () => {
    const logooutbtn = document.createElement('button');
    logooutbtn.textContent = "Log Out";
    logooutbtn.className = "Log-out";
    logooutbtn.addEventListener('click', () => {
        localStorage.setItem('authorization', "");
        location.reload();
    });
    return logooutbtn;
}