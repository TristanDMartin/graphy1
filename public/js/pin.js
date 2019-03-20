function selectHandler(){
    $.ajax({
        url: "/getUser",
        type: "GET"
    }).then((user) => {
        var selection = chart.getSelection();
        console.log(User +" selected "+ selection);
    });

}