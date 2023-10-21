<script setup>
import { onMounted, ref } from "vue";
import { useGetData } from "../../../composables/getData";

import IconDropDownVue from "../../../components/icons/IconDropDown.vue";

const {data, getData, loading, errorData} = useGetData();
let addContactModal = ref(null);
const params = ref({ id: null, name: '', email: '', role: '', phone: '', location: '' });

onMounted(() => {
  getData("http://localhost/j/area.php");
  initPopup();
});

const delete_user = (subArea, area) => {
  console.log(subArea);
  console.log(area.sub_area);
  area.sub_area = area.sub_area.filter((d) => d.area_id != subArea.area_id);
  console.log(area.sub_area);
        // ids.value = ids.value.filter((d) => d != user.id);
        // search_contacts();
        // showMessage('User deleted successfully.');
};
const edit_user = (subArea) => {
        //params.value = { id: null, name: '', email: '', role: '', phone: '', location: '' };
        params.value = { id: subArea.area_id, name: subArea.nombre };
        // if (user) {
        //     params.value = JSON.parse(JSON.stringify(subArea));
        // }

        addContactModal.show();
    };
    const initPopup = () => {
        addContactModal = new window.bootstrap.Modal(document.getElementById('addContactModal'));
    };

    const save_user = () => {
        // if (!params.value.name) {
        //     showMessage('Name is required.', 'error');
        //     return true;
        // }
        // if (!params.value.email) {
        //     showMessage('Email is required.', 'error');
        //     return true;
        // }
        // if (!params.value.phone) {
        //     showMessage('Phone is required.', 'error');
        //     return true;
        // }

        if (params.value.id) {

          console.log("save");
          console.log(params.value.id);
          let subAreaMod = area.sub_area.find((d) => d.area_id == params.value.id);
          console.log(subAreaMod);

            //update user
            // let user = contacts_list.value.find((d) => d.id == params.value.id);
            // user.name = params.value.name;
            // user.email = params.value.email;
            // user.role = params.value.role;
            // user.phone = params.value.phone;
            // user.location = params.value.location;
        // } else {
        //     //add user
        //     let max_user_id = contacts_list.value.reduce((max, character) => (character.id > max ? character.id : max), contacts_list.value[0].id);
        //     if (!max_user_id) {
        //         max_user_id = 0;
        //     }
        //     let user = {
        //         id: max_user_id + 1,
        //         path: 'profile-30.png',
        //         name: params.value.name,
        //         email: params.value.email,
        //         role: params.value.role,
        //         phone: params.value.phone,
        //         location: params.value.location,
        //     };
        //     contacts_list.value.splice(0, 0, user);
        //     search_contacts();
         }

        //showMessage('User saved successfully.');
        addContactModal.hide();
    };
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <h3 class="mt-4">Catalogo Áreas</h3>
      <div class="contenedor_cat">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status" v-if="loading">
            <span class="visually-hidden">Cargando información ...</span>
          </div>
          <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" v-if="errorData">
            <div class="toast-header-error">
              <strong class="me-auto">Error</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body-error">
              {{ errorData }}
            </div>
          </div>
        </div>
        
        <!-- <ul>
          <li v-for="area in data">
            {{ area.nombre }}
            <ul>
              <li v-for="subArea in area.sub_area">{{ subArea.nombre }}</li>
            </ul>
          </li>
        </ul> -->

        <div class="d-flex flex-lg-column justify-content-start m-3">
          <div id="toggleAccordion" class="accordion">
            <div class="card" v-for="area in data">
              <header class="card-header" role="tab">
                <section class="mb-0 mt-0">
                  <div
                    class="collapsed d-flex justify-content-between"
                    role="menu"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${area.area_id}`"
                    aria-expanded="true"
                    aria-controls="headingTwo1"
                  >
                    {{ area.nombre }}
                    <div class="icons" v-if="area.sub_area">
                      <IconDropDownVue></IconDropDownVue>
                    </div>
                  </div>
                </section>
              </header>
              <div
                :id="area.area_id"
                class="collapse"
                aria-labelledby="headingTwo1"
                data-bs-parent="#toggleAccordion"
                v-if="area.sub_area"
              >
                <div class="card-body">
                  <ul class="list-unstyled">
                    <li v-for="subArea in area.sub_area">
                      <div class="row">
                        <div class="col-6">
                          {{ subArea.nombre }}
                        </div>
                        <div class="col-6">
                          <div class="action-btn">
                                    <a href="javascript:;" class="me-1" @click="edit_user(subArea)">
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
                                            class="feather feather-edit-2 edit"
                                        >
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                        </svg>
                                    </a>
                                    <a href="javascript:;" @click="delete_user(subArea, area)">
                                      <svg xmlns="http://www.w3.org/2000/svg" 
                                           width="24" 
                                           height="24" 
                                           viewBox="0 0 24 24" 
                                           fill="none" 
                                           stroke="currentColor" 
                                           stroke-width="2" 
                                           stroke-linecap="round" 
                                           stroke-linejoin="round" 
                                           class="feather feather-minus-square">
                                           <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                           <line x1="8" y1="12" x2="16" y2="12"></line>
                                      </svg>
                                    </a>
                                </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div id="addContactModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-md modal-dialog-centered">
                            <div class="modal-content mailbox-popup">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{ params.id ? 'Update User' : 'Add User' }}</h5>
                                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="add-contact-box">
                                        <div class="add-contact-content">
                                            <form id="addContactModalTitle">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-4">
                                                            <label>Nombre de área</label>
                                                            <input type="text" v-model="params.name" class="form-control" placeholder="Escriba nombre del área" />
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Name</label>
                                                            <input type="text" v-model="params.name" class="form-control" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Email</label>
                                                            <input type="text" v-model="params.email" class="form-control" placeholder="Email" />
                                                        </div>
                                                    </div> -->
                                                </div>

                                                <!-- <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Occupation</label>
                                                            <input type="text" v-model="params.role" class="form-control" placeholder="Occupation" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group mb-4">
                                                            <label>Phone</label>
                                                            <input type="text" v-model="params.phone" class="form-control" placeholder="Phone" />
                                                        </div>
                                                    </div>
                                                </div> -->

                                                <!-- <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-0">
                                                            <label>Location</label>
                                                            <input type="text" v-model="params.location" class="form-control" placeholder="Location" />
                                                        </div>
                                                    </div>
                                                </div> -->
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                                    <button type="button" class="btn btn-primary" @click="save_user()">{{ params.id ? 'Update' : 'Add' }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
      </div>
    </div>
  </div>
</template>

<style>
.contenedor_cat {
  margin: 1rem 1rem 1rem;
  padding: 10px;
  border: solid #b2b4ba;
  border-width: 1px;
  border-radius: 6px;
}
.card-header {
    color: #fff;
    background-color: #9A278F;
}
.toast-header-error {
    display: flex;
    align-items: center;
    padding: 7px;
    background: #E7515A;
    color: #fff;
    border-bottom: 1px solid rgba(33, 150, 243, 0.3411764706);
}
.toast-body-error {
    padding: 16px 12px;
    color: #000;
    word-wrap: break-word;
}
</style>
