function setupDragAndDrop(curId) {
    // $(".tierlist").sortable({

    //     axis: "y",
    //     revert: true,
    //     scroll: false,
    //     placeholder: "sortable-placeholder",
    //     cursor: "move"

    // });

    $(".tier-card").each(function (i) {
        var item = $(this);
        var item_clone = item.clone();
        item.data("clone", item_clone);
        var position = item.position();
        item_clone
            .css({
                left: position.left,
                top: position.top,
                visibility: "hidden"
            })
            .attr("data-pos", i + 1);

        $("#cloned-slides").append(item_clone);
    });

    $(".tierlist").sortable({

        axis: "y",
        revert: true,
        scroll: false,
        placeholder: "sortable-placeholder",
        cursor: "move",

        start: function (e, ui) {
            ui.helper.addClass("exclude-me");
            $(".all-slides .slide:not(.exclude-me)")
                .css("visibility", "hidden");
            ui.helper.data("clone").hide();
            $(".cloned-slides .slide").css("visibility", "visible");
        },

        stop: function (e, ui) {
            $(".tierlist .tier-card.exclude-me").each(function () {
                var item = $(this);
                var clone = item.data("clone");
                var position = item.position();

                clone.css("left", position.left);
                clone.css("top", position.top);
                clone.show();

                item.removeClass("exclude-me");
            });

            $(".tierlist .tier-card").each(function () {
                var item = $(this);
                var clone = item.data("clone");

                clone.attr("data-pos", item.index());
            });

            $(".tierlist .tier-card").css("visibility", "visible");
            $(".cloned-slides .tier-card").css("visibility", "hidden");
        },

        change: function (e, ui) {
            $(".tierlist .tier-card:not(.exclude-me)").each(function () {
                var item = $(this);
                var clone = item.data("clone");
                clone.stop(true, false);
                var position = item.position();
                clone.animate({
                    left: position.left,
                    top: position.top
                }, 200);
            });
        },

        update: function(event, ui) {
            new_locations = $(this).find('.tier-card').map(function(i, el) {
              return $(el)
            }).get()
            
            if(this.classList[1] == 'tierlist2') {
                const updatedListTwo = [];
                new_locations.forEach(element => {
                    updatedListTwo.push(parseInt(element[0].classList[1]));
                });
                tierListTwo = updatedListTwo;
            } else {
                const updatedListOne = [];
                new_locations.forEach(element => {
                    updatedListOne.push(parseInt(element[0].classList[1]));
                });
                tierListOne = updatedListOne;
            }
            
            // console.log(tierListOne, tierListTwo);
          }

    });
}