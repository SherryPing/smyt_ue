/**
 * Created by 84299 on 2018/1/30.
 */
//底层JS
function basicFn(){
    //右侧导航栏锚点
    $('.anchor').on("click", function() {
        var distance = $('#' + $(this).data("id")).offset();
        move(distance.top);
    });

}
//锚点滑动
function move(top,spe) {
    var speed = spe||800;
    $('html,body').animate({
        scrollTop: top + 'px'
    }, speed)
}
basicFn();