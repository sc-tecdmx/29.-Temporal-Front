<script setup>


</script>
<template>
    <div class="menu_side" id="menu_side">
        <!-- <div class="name_page">
            <IconFeatherTrash></IconFeatherTrash>
            <h4>Nombre pagina</h4>
        </div> -->
        <div class="options_menu">
            <a href="#" class="selected">
                <div class="option">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-home"
                        title="Tablero">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <h4>Tablero</h4>
                </div>
            </a>
            <a href="#">
                <div class="option">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-cpu"
                        title="Docuemntos">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                        <rect x="9" y="9" width="6" height="6"></rect>
                        <line x1="9" y1="1" x2="9" y2="4"></line>
                        <line x1="15" y1="1" x2="15" y2="4"></line>
                        <line x1="9" y1="20" x2="9" y2="23"></line>
                        <line x1="15" y1="20" x2="15" y2="23"></line>
                        <line x1="20" y1="9" x2="23" y2="9"></line>
                        <line x1="20" y1="14" x2="23" y2="14"></line>
                        <line x1="1" y1="9" x2="4" y2="9"></line>
                        <line x1="1" y1="14" x2="4" y2="14"></line>
                    </svg>
                    <h4>Documentos</h4>
                </div>
            </a>
        </div>
            
        
    </div>
</template>
<style>
    /* *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        font-size: 18px;

    } */
    .menu_side{
        width: 75px;
        height: 100%;
        background: #690061;
        position: fixed;
        top: 0;
        left: 0;
        color: white;
        font-size: 18px;
        z-index: 300;
        overflow: hidden;
        overflow-y: scroll;
        border-right: 20px solid #690061;
    }

    .menu_side::-webkit-scrollbar{
        display: none;
    }
    .menu_side{
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .name_page{
        padding: 20px 30px;
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    .options_menu{
        padding: 20px 30px;
        position: absolute;
        top:80px;
    }

    .options_menu a{
        color: #FFFFFFB2;
        cursor: default;
        display: block;
        position: relative;
        transition: color 300ms;
    }

    .options_menu a:hover{
        color: #ff8200;
    }
    .options_menu .option{
        padding: 20px 0px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .options_menu .option svg{
        width: 18px;
        margin-right: 20px;
        cursor: pointer;
    }

    .options_menu .option h4{
        font-weight: 300;
        cursor: pointer;
    }

    a.selected{
        color: #ff8200;
    }

    .selected:before{
        content: '';
        width: 3px;
        height: 80%;
        background: #ff8200;
        position: absolute;
        top: 10%;
        left: -30px;
    }

    .body_move{
        margin-left: 250px;
    }

    .menu_side_move{
        width: 250px;
    }

</style>


