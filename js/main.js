$(document).ready(function()
{
    /*
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
    */

    $(window).on("scroll", function()
    {
        scrollHandler();
    });
    scrollHandler();

    $('a[href^="#"]').click(function() {
        var href = $.attr(this, 'href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 500, function () {
            window.location.hash = href;
        });
    });

    $(".button.play").click(function()
    {
        addplayerclickevent($(this));
    });
    $("#lightbox").click(function()
    {
        $(this).addClass("hidden");
        removeplayer();
        $("#bg-video").get(0).play();
    });

    gallerycards();
});

function addplayerclickevent(element)
{
    // Apply to play buttons
    let type = element.attr("video-type");
    let id = element.attr("video-id");
    playvideo(type, id);
}

function gallerycards()
{
    const container = document.querySelector(".container");

    Array.from(container.querySelectorAll(".card")).forEach(card => {
        card.addEventListener("click", (e) => {

            // Clone the clicked element
            const clone = card.cloneNode(true);
            card.classList.toggle("flat");

            let scroll = $(window).scrollTop();

            /* Set some initial styles to match it,
            * but fix the position and flow it outside of the grid
            */
            clone.style.position = "fixed";
            clone.style.left = card.offsetLeft + "px";
            clone.style.top = card.offsetTop - scroll + "px";
            clone.style.width = card.clientWidth + "px";
            clone.style.height = card.clientHeight + "px";

            // Add the cloned element
            card.parentElement.appendChild(clone);

            // Add the card-full class on the next tick to keep the animation
            setTimeout(() => clone.classList.add("card-full"), 100);
            $("html").addClass("scroll-lock");

            // Shrink the full view back down to where it came from, then remove it
            clone.addEventListener("click", e => {
                if (e.srcElement.classList.contains("button"))
                {
                    return;
                }
                clone.classList.remove("card-full");
                card.classList.toggle("flat");
                $("html").removeClass("scroll-lock");
                setTimeout(() => clone.remove(), 300);
            });
            Array.from(clone.querySelectorAll(".button.play")).forEach(button => {
                button.addEventListener("click", e => {
                    addplayerclickevent($(button));
                });
            });
        });
    });
}

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

function scrollHandler()
{
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();

    $(".page").each(function()
    {
        let pos = $(this).offset().top - scroll;
        let hash = $(this).attr("id");
        if (Math.abs(pos) <= windowHeight / 2)
        {
            $(".nav a").removeClass("selected");
            $(".nav a[href='#" + hash + "']").addClass("selected");

            // Update URL
            window.location.hash = hash;
            $('html,body').scrollTop(scroll);
            return;
        }
    });
}

function addplayer()
{
    $("#lightbox").append('<iframe id="videoplayer" style="border:none;" src="" width="900" height="506" allowfullscreen></iframe><div class="video-close"></div>');
}

function removeplayer()
{
    $("#videoplayer").remove();
    $(".video-close").remove();
}

function playvideo(type, id) {
    let box = $("#lightbox");
    let player = $("#videoplayer");
    let url = "";
    if (type == "drive")
    {
        url = "https://drive.google.com/file/d/$/preview";
    }
    else if (type == "youtube")
    {
        url = "https://www.youtube.com/embed/$";
    }
    else if (type == "soundcloud")
    {
        // Get secret ID from https://iframely.com/domains/soundcloud
        url = "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/$1&secret_token=$2&show_artwork=false";
    }

    if (type == "soundcloud")
    {
        let val = id.split(";");
        url = url.replace("$1", val[0]);
        url = url.replace("$2", val[1]);
    }
    else
    {
        url = url.replace("$", id);
    }
    // Prepare video
    addplayer();
    $("#videoplayer").attr("src", url);

    if (type == "soundcloud")
    {
        // Lower the height of the window for soundcloud media
        $("#lightbox").addClass("small-player");
    }
    else
    {
        $("#lightbox").removeClass("small-player");
    }

    // Show lightbox
    box.removeClass("hidden");
    $("#lightbox .loader").fadeIn(250);
    $("#videoplayer").on("load", function()
    {
        $("#lightbox .loader").fadeOut(250, function()
        {
            $("#videoplayer").fadeIn(250);
            $("#lightbox .video-close").fadeIn(250);
        });
    });

    // Pause background
    $("#bg-video").get(0).pause();
}
