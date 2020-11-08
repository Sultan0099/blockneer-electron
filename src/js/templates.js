/*
---------------------------
Navbar template
---------------------------
*/

const navbar = () => {
    return (
        `<span class="navbar-brand mr-auto">
        <img src="../assets/icon.png" class="d-inline-block align-top brand" alt="">
    </span>
    <span class="navbar-right">
        <a class="tab-btn" href="#">
            <img src="../assets/icons/help.png" />
        </a>
        <span class="divider"> </span>
        <a class="tab-btn" href="#">
            <img src="../assets/icons/settings.png" />
        </a>
        <span class="divider"> </span>
        <div class="profile">
            <span class="avatar-wrapper"></span>
            <p class="caption name">John Doe</p>
            <div class='dropdown'>

            </div>
        </div>
        <!-- <span class="divider"> </span> -->
        <a class="tab-btn" href="#">
            <img src="../assets/icons/light.png" />
        </a>
    </span>`
    )
}