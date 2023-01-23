var contacts = [
    { name: "Ziad Nehad", Number: "01123456789", Email: "Ziad@gmail.com", Gender: "male", image: "ziad.jpg" },
    { name: "Hassan Al-Sharif", Number: "01123456789", Email: "Hassan@gmail.com", Gender: "male", image: "hassan.png" },
    { name: "Abdullah Khames", Number: "01123456789", Email: "Abdullah@gmail.com", Gender: "male", image: "khamis.png" },
    { name: "Hamza Alaa", Number: "01123456789", Email: "Hamza@gmail.com", Gender: "male", image: "hamza.png" }
];
// alert("First name of first contact: " + contacts[0].name);
var numberOfcontacts = contacts.length;
// alert("Total Number of contacts is: " + numberOfcontacts);

$(document).on("click", "#myList li a", function () {
    selectedIndex = $(this).closest("li").index();
    // alert("The selected index when the view button is clicked: " + selectedIndex);
    var currentImage = "images/" + contacts[selectedIndex].image;
    var fullName = contacts[selectedIndex].name;
    var Number = contacts[selectedIndex].Number;
    var Email = contacts[selectedIndex].Email;
    var Gender = contacts[selectedIndex].Gender;
    // alert(currentImage);

    if (currentImage == "images/") {
        currentImage = "images/photo_not_available_wide.png";
    }

    $("#contact_page div#container").empty();
    $("#contact_page div#container")
        .append(`<img style='border:1px solid black' src= "  ${currentImage} ",  width='307' height='240' alt=''/>`);
    $("#contact_page div#container")
        .append(`<h1 style = 'color:red'> ${fullName}  </h1>`);
    $("#contact_page div#container")
        .append(`<p><strong style = 'color:red'>Number:</strong>   ${Number}  </p>`);
    $("#contact_page div#container")
        .append(`<p><strong style = 'color:red'>Email:</strong> ${Email} </p>`);
    $("#contact_page div#container")
        .append(`<p><strong style = 'color:red'>Gender:</strong> ${Gender} </p>`);

});

$(document).ready(function (e) {

    createListView();


    $("#add_contacts_form").hide();
    $("#add_contact_btn").hide();
    $("#cancel_add_contact_btn").hide();
    $("#edit_contact_btn").hide();

    $("#show_add_contacts_form").click(function () {
        $(this).hide();
        $("#add_contacts_form").slideDown(500);
        $("#add_contact_btn").show();
        $("#cancel_add_contact_btn").show();
    });

    $("#cancel_add_contact_btn").click(function (e) {
        closeForm();
    });

    function closeForm() {
        $("#add_contacts_form").slideUp(500);
        $("#show_add_contact_form").show();
        $("#textinput-1").val("");
        $("#tel").val("");
        $("#email").val("");
        $('input[name="radio-choice"]:checked').val("");
        $("#imageID").val("");
        $("#add_contact_btn").hide();
        $("#cancel_add_contact_btn").hide();
        $("#edit_contact_btn").hide();
        $("#show_add_contacts_form").show();
    }

    $("#add_contact_btn").click(function (e) {
        numberOfcontacts++
        var fullName = $("#textinput-1").val();
        var tel = $("#tel").val();
        var cEmail = $("#email").val();
        var cGender = $('input[name="radio-choice"]:checked').val();
        var imageField = $("#imageID").val();
        contacts.push({
            name: fullName, Number: tel, Email: cEmail,
            Gender: cGender, image: imageField
        });


        $("#myList").empty();
        createListView();
        closeForm();

    })



    $(document).on("click", "#myList li a#edit", function () {
        $("#add_contacts_form").slideDown();
        $("#show_add_contacts_form").hide();
        $("#cancel_add_contact_btn").show(); $("#edit_contact_btn").show();
        $("#textinput-1").val(contacts[selectedIndex].name);
        $("#tel").val(contacts[selectedIndex].Number);
        $("#email").val(contacts[selectedIndex].Email);
        $('input[name="radio-choice"]:checked').val(contacts[selectedIndex].Gender);
        $("#imageID").val(contacts[selectedIndex].image);
    });


    $("#edit_contact_btn").click(function (e) {
        contacts[selectedIndex].name = $("#textinput-1").val();
        contacts[selectedIndex].Number = $("#tel").val();
        contacts[selectedIndex].Email = $("#email").val();
        contacts[selectedIndex].Gender = $('input[name="radio-choice"]:checked').val();
        contacts[selectedIndex].image = $("#imageID").val();
         $("#myList").empty(); // Clear ListView
        createListView(); // Recreate ListView
        closeForm(); // Close Form
    });


    $("#delete_contact_btn").click(function(e){
        var choose = confirm("Are you sure you want to delete this contact?");
        console.log(choose);
        if (choose == true) {
            contacts.splice(selectedIndex,1); // Remove selectedItem form contacts array
            $("#myList li").eq(selectedIndex).remove(); // Remove selectedItem from ListView
            window.location.href = "#contacts";  
        }
        else
        {
            window.location.href = "#contacts";
        }
        }); 


})

function createListView() {
    for (i = 0; i < numberOfcontacts; i++) {
        // alert(contacts[i].name + " " + contacts[i].Number +
        //  ": " + contacts[i].Email);

        var fullName = contacts[i].name;
        var Numbers = contacts[i].Number;
        var imageDirAndName = "images/" + contacts[i].image;
        var Emails = contacts[i].Email;

        if (imageDirAndName == "images/") {
            imageDirAndName = "images/photo_not_available_wide.png";
        }
        // alert(imageDirAndName);
        $("#myList").append(`<li>
        <a href="#contact_page">
        <img src= ${imageDirAndName}  width="307" height="240" alt="image">
        <h3 style='color:orange'>  ${fullName} </h3>
        <h5>${Numbers}</h5>
        <p>${Emails}</p></a>

        <a href="#" id='edit'>  </a>
        </li>`);

        // Once a ListView is manipulated, it has to be REFRESHED to see the updated appearance.
        $("#myList").listview("refresh");
    }
}