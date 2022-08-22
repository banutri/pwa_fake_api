let tableListUser = $('#tableListUser').DataTable({
    data:[],
    columns:[
        {data:'id'},
        {data:'name'},
        {data:'email'},
    ],
    pageLength:1000,
});
// get_user_list();

$('#btnGetData').on('click',function(){
    get_user_list();
})

function get_user_list(){
    let user_list=[];
    $.ajax({
        type: "get",
        // async:false,
        url: "https://my-json-server.typicode.com/banutri/pwa_fake_api/db",
        data: "{}",
        dataType: "json",
        success: function (response) {
            user_list=response.data
            tableListUser.clear().rows.add(user_list).draw()

        }
    });

    
}

if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        this.navigator.serviceWorker.register('/service_worker.js').then(function(registration){
            console.log('Service worker registered scope: ', registration.scope);
        }, function(err){
            console.log('Service worker failed registered : ',err);
        })
    })
}