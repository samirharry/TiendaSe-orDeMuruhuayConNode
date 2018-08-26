// ====================================================
// Barra de navegacion unica
// ===============================================
var navBar = new Vue({
    el: '#navBar',
    methods:{
        toggleMovil:()=>{
            console.log('despliegue');
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
        },
        showProductos: ()=>{
            divCat.catSeen = false;
            divMar.marSeen = false;
        },
        showMarcas: ()=>{
            divCat.catSeen = false;
            divMar.marSeen = true;
        },
        showCategorias: ()=>{
            divCat.catSeen = true;
            divMar.marSeen = false;
        }
    }
});
// ====================================================
// Seccion de categorias
// ===============================================
var divCat = new Vue({
    el: '#divCat',
    data:{
        catSeen: false,
        resCatSeen: false,
        errCatSeen: false,
        tabCatSeen: false,
        borCatSeen: false,
        borrResCatSeen:false,
        newName: '',
        newDesc: '',
        nombre: '',
        descripcion: '',
        error:'',
        categorias:[],
        mensaje: '',
        cateABorra: ''
    },
    methods:{
        creaCategoria: ()=>{
            divCat.resCatSeen = false;
            divCat.errCatSeen = false;
            divCat.tabCatSeen = false;
            console.log(divCat.newName);
            console.log(divCat.newDesc);
            data = {
                nombre: divCat.newName,
                descripcion: divCat.newDesc
            };
            $.post("/categorias",data)
                .done((res)=>{
                divCat.resCatSeen = false;
                divCat.nombre= res.categoria.nombre;
                divCat.descripcion= res.categoria.descripcion;
                divCat.resCatSeen = true;
                })
                .fail((err)=>{
                divCat.error='Ah ocurrido un error';
                divCat.errCatSeen = true;
            });
        },
        muestraCategorias: ()=>{
            $.ajax({
                type: 'get',
                url: '/categorias',
                beforeSend: ()=>{
                    divCat.resCatSeen = false;
                    divCat.errCatSeen = false;
                    divCat.tabCatSeen = false;
                },
                success: (res)=>{
                    console.log(res.categorias);
                    divCat.categorias = res.categorias;
                    divCat.tabCatSeen =true;
                },
                error: (err)=>{
                    console.log(err);
                    divCat.error='Ah ocurrido un error';
                    divCat.errCatSeen = true;
                }
            });
        },
        borraCategoria:()=>{
            console.log(divCat.cateABorra);
            $.ajax({
                type: 'delete',
                url: `categorias/${divCat.cateABorra}`,
                beforeSend: ()=>{
                    divCat.resCatSeen = false;
                    divCat.errCatSeen = false;
                    divCat.tabCatSeen = false;
                },
                success: (res)=>{
                    console.log(res.categorias);
                    divCat.mensaje = res.message;
                },
                error: (err)=>{
                    console.log(err);
                    divCat.error='Ah ocurrido un error';
                },
                complete : ()=>{
                    divCat.borrResCatSeen= true;
                }
            });
        },
        closeDivResCatSeen: ()=>{
            divCat.resCatSeen=false;
        },
        closeDivBorResCatSeen:()=>{
            divCat.borrResCatSeen= false;
        },
        closetabCatSeen: ()=>{
            divCat.tabCatSeen = false;
        },
        showBorCatSeen: ()=>{
            $.ajax({
                type: 'get',
                url: '/categorias',
                beforeSend: ()=>{
                    divCat.borCatSeen=!divCat.borCatSeen;
                    divCat.resCatSeen = false;
                    divCat.errCatSeen = false;
                    divCat.tabCatSeen = false;
                },
                success: (res)=>{
                    console.log(res.categorias);
                    divCat.categorias = res.categorias;
                },
                error: (err)=>{
                    console.log(err);
                    divCat.error='Ah ocurrido un error';
                }
            });
        }
    }
});
// ====================================================
// Seccion de marcas
// ===============================================
var divMar = new Vue({
    el: '#divMar',
    data:{
        marSeen: false,
        resMarSeen: false,
        errMarSeen: false,
        tabMarSeen: false,
        borMarSeen: false,
        newName: '',
        newDesc:'',
        nombre: '',
        descripcion: '',
        error:'',
        marcas:[],
        mensaje: ''
    },
    methods:{
        creaMarca: ()=>{
            divMar.resMarSeen = false;
            divMar.errMarSeen = false;
            divMar.tabMarSeen = false;
            divMar.marSeen=false;
            console.log(divCat.newName);
            console.log(divCat.newDesc);
            data = {
                nombre: divMar.newName,
                descripcion: divMar.newDesc
            };
            $.post("/marcas",data)
                .done((res)=>{
                    divMar.resMarSeen = false;
                    divMar.nombre= res.marca.nombre;
                    divMar.descripcion= res.marca.descripcion;
                    divMar.resMarSeen = true;
                    divMar.marSeen=true;
                })
                .fail((err)=>{
                    divMar.error='Ah ocurrido un error';
                    divMar.errMarSeen = true;
                    divMar.marSeen=true;
            });
        },
        muestraMarcas:()=>{
            divMar.resMarSeen = false;
            divMar.errMarSeen = false;
            divMar.tabMarSeen = false;
            divMar.marSeen = true;
            $.get("/marcas")
            .done((res)=>{
                console.log(res.marcas);
                divMar.marcas = res.marcas;
                divMar.tabMarSeen = true;
            })
            .fail((err)=>{
                divCat.error='Ah ocurrido un error';
                divCat.errCatSeen = true;
            });
        },
        closeDivResMarSeen: ()=>{
            divMar.resMarSeen =false;
        }
    }
});
// ====================================================
// Seccion de productos
// ===================================================