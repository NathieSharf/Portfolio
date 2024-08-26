$(document).ready(function()
{
    // On first load
    console.log("Hello world!");
    pageHandler();

    // Listeners
    $(".nav > ul > li > a").click(function()
    {
        let href = $(this).attr("href");
        window.location.hash = href;
        $(".page").hide();
        pageHandler();
    });
});

function pageHandler() {
    let hash = window.location.hash;
    $(".page").each(function()
    {
        let id = $(this).attr("id");
        if (hash == "#" + id)
        {
            $(".page" + hash).show();
        }
    });
    $(".nav > ul > li > a").each(function()
    {
        $(this).removeClass("selected");
        
        let href = $(this).attr("href");
        if (hash == href)
        {
            $(this).addClass("selected");
        }
    });
}
