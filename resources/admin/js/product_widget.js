
function masnoryLayout() {
    var elem = document.querySelector('.r_pw_g_all_reviews_container');

    var msnry = new Masonry(elem, {
        // options
        itemSelector: '.r_pw_r_g_container',
        percentPosition: true,
        gutter: 15
    });
    console.log(msnry)
}

masnoryLayout();


function mosaicLayout() {
    console.log('Executing')
    var elem = document.querySelector('.r_pw_r_m_all_reviews_container');

    var msnry = new Masonry(elem, {
        // options
        itemSelector: '.r_pw_r_m_container',
        percentPosition: true,
        gutter: 15
    });
    console.log(msnry)
}

mosaicLayout();



// element argument can be a selector string
//   for an individual element
//     var msnry = new Masonry('.grid', {
//         // options
//     });