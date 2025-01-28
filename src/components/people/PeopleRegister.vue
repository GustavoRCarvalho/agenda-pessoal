<script setup>
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/components/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../utils/functions'
import InputDefault from '../InputDefault.vue'

const ModalsStore = useModalsStore()
const { peopleSwitch } = ModalsStore
const { peopleModal } = storeToRefs(ModalsStore)

const RegisterStore = useRegistersStore()
const { resetPeopleRegisterEdit } = RegisterStore
const { peopleRegisterEdit } = storeToRefs(RegisterStore)

const formFields = reactive({ ...peopleRegisterEdit.value })

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => peopleRegisterEdit.value,
  (newVal) => {
    Object.assign(formFields, newVal)
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => peopleModal.value,
  (newVal) => {
    if (!newVal) {
      resetPeopleRegisterEdit()
    }
  },
)

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, peopleRegisterEdit.value)
}

function handleSubmit(e) {
  e.preventDefault()

  const form = new FormData(e.target)
  const formValues = Object.fromEntries(form)
  if (!formValues.id) {
    formValues.id = generateUniqueId()
  }

  console.log(formValues)
}
</script>
<template>
  <ModalBackground @closeModal="peopleSwitch">
    <div class="modal-container">
      <div>
        <span>People Register</span> <button type="button" @click="peopleSwitch">close</button>
      </div>
      <form v-on:submit="handleSubmit" v-on:reset="handleReset">
        <InputDefault
          v-model="formFields.name"
          type="text"
          label="Nome"
          name="name"
          placeholder="Nome"
        />
        <InputDefault
          v-model="formFields.cpf"
          type="text"
          label="CPF"
          name="cpf"
          mask="###.###.###-##"
          placeholder="000.000.000-00"
        />
        <label for="foto">foto</label>
        <input
          type="file"
          @change="(e) => (formFields.foto = e.target.files[0])"
          name="foto"
          id="foto"
        />
        <InputDefault
          v-model="formFields.bairro"
          type="text"
          label="Bairro"
          name="bairro"
          placeholder="Bairro"
        />
        <InputDefault
          v-model="formFields.cep"
          type="text"
          label="CEP"
          name="cep"
          mask="#####-###"
          placeholder="00000-000"
        />
        <InputDefault
          v-model="formFields.cidade"
          type="text"
          label="Cidade"
          name="cidade"
          placeholder="Cidade"
        />
        <InputDefault
          v-model="formFields.estado"
          type="text"
          label="Estado"
          name="estado"
          placeholder="Estado"
        />
        <InputDefault
          v-model="formFields.logradouro"
          type="text"
          label="Rua"
          name="logradouro"
          placeholder="Rua"
        />
        <InputDefault
          v-model="formFields.numero"
          type="number"
          label="Número"
          name="numero"
          placeholder="000"
        />
        <InputDefault
          v-model="formFields.pais"
          type="text"
          label="País"
          name="pais"
          placeholder="País"
        />
        <button type="reset">Limpar</button>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </ModalBackground>
</template>
<style scoped></style>
<!-- {
  "cpf": "string",
  "endereco": {
    "bairro": "string",
    "cep": "string",
    "cidade": "string",
    "estado": "string",
    "id": 0,
    "logradouro": "string",
    "numero": 0,
    "pais": "string"
  },
  "foto": {
    "id": "string",
    "name": "string",
    "type": "string"
  },
  "id": 0,
  "nome": "string"
} -->
