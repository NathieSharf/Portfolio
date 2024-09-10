$(document).ready(function()
{
    // On first load
    pageHandler();

    // Listeners
    $(".nav > ul > li > a").click(function()
    {
        let href = $(this).attr("href");
        window.location.hash = href;
        $(".page").hide();
        pageHandler();
    });
    $(".button.play").click(function()
    {
        let id = $(this).attr("video-id");
        playvideo(id);
    });
    $("#lightbox").click(function()
    {
        $(this).addClass("hidden");
        removeplayer();
        $("#bg-video").get(0).play();
    });
});

function pageHandler() {
    let hash = window.location.hash;
    if (hash == "")
    {
        // Empty hash, go to first page
        hash = "#" + $(".page").first().attr("id");
    }
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

function addplayer()
{
    $("#lightbox").html('<iframe id="videoplayer" style="border:none;" src="" width="900" height="506"></iframe>');
}

function removeplayer()
{
    $("#videoplayer").remove();
}

function playvideo(id) {
    let box = $("#lightbox");
    let player = $("#videoplayer");
    let url = "https://drive.google.com/file/d/?/preview";
    url = url.replace("?", id);
    // Prepare video
    addplayer();
    $("#videoplayer").attr("src", url)

    // Show lightbox
    box.removeClass("hidden");

    // Pause background
    $("#bg-video").get(0).pause();
}
