<script setup>
import { useListsStore } from '@/stores/lists'
import { useModalsStore } from '@/stores/modals'
import { useRegistersStore } from '@/stores/registers'
import ModalBackground from '@/router/ModalBackground.vue'
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { generateUniqueId } from '../../utils/functions'
import InputDefault from '../inputs/InputDefault.vue'
import InputCheck from '../inputs/InputCheck.vue'
import InputSelect from '../inputs/InputSelect.vue'
import InputPhone from '../inputs/InputPhone.vue'
import { optionsTipoContato } from '@/utils/constants'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const ModalsStore = useModalsStore()
const { contactSwitch } = ModalsStore
const { contactModal } = storeToRefs(ModalsStore)

const ListsStore = useListsStore()
const { setPeople } = ListsStore
const { people } = storeToRefs(ListsStore)

const UserStore = useUserStore()
const { user } = storeToRefs(UserStore)

const RegisterStore = useRegistersStore()
const { resetContactRegisterEdit } = RegisterStore
const { contactRegisterEdit } = storeToRefs(RegisterStore)

const optionsPessoa = ref([])
const formFields = reactive({ ...contactRegisterEdit.value })

//Atualiza os campos reativos do formulário caso seja aberto como um editar
watch(
  () => contactRegisterEdit.value,
  (newVal) => {
    Object.assign(formFields, newVal)
  },
)

//Limpa o store do Cadastro de Pessoas quando fecha a modal
watch(
  () => contactModal.value,
  (newVal) => {
    if (!newVal) {
      resetContactRegisterEdit()
      return
    }
    if (people.value.length === 0) {
      setPeople()
    }
  },
)

watch(people, (value) => {
  optionsPessoa.value = value.map(({ id, nome }) => {
    return { key: id, label: nome }
  })
})

function handleReset(e) {
  e.preventDefault()
  Object.assign(formFields, contactRegisterEdit.value)
}

function handleSubmit(e) {
  e.preventDefault()

  if (!formFields.id) {
    formFields.id = generateUniqueId()
  }

  people.value.forEach((value) => {
    if (formFields.pessoaOption.key === value.id) {
      formFields.pessoa = value
      return
    }
  })
  formFields.tipoContato = formFields.tipoContatoOption.key

  // como o vue usa reatividade e o contactRegisterEdit inclui elementos reativos dentro do objeto
  // não é possível equiparar os dois valores contidos nos objetos de forma tradicional.
  // por isso a alternativa comum de transformar os objetos em strings e compara-las,
  // isso força o vue a revelar completamente os objetos sem passar nenhuma propriedade reativa

  if (JSON.stringify(contactRegisterEdit.value) === JSON.stringify(formFields)) {
    console.log('Não alterou')
    return
  }

  formFields.usuario = user.value
  // post
  console.log(formFields)
}
</script>
<template>
  <ModalBackground @closeModal="contactSwitch">
    <div class="modal-container">
      <h2 class="register-title">Registro de Contato</h2>
      <form class="register-form" v-on:submit="handleSubmit" v-on:reset="handleReset">
        <div class="form-input-container">
          <span>Pessoa</span>
          <div class="form-input-wrapper">
            <InputSelect
              :options="optionsPessoa"
              v-model="formFields.pessoaOption"
              label="Selecione uma Pessoa"
              name="pessoa"
            />
            <button type="button" class="reload-button" @click="setPeople">
              <span class="not-visible">Recarregar lista de Pessoas</span>
              R
            </button>
          </div>
        </div>
        <div class="form-input-container">
          <span>Dados</span>
          <div class="form-input-wrapper">
            <InputSelect
              :options="optionsTipoContato"
              v-model="formFields.tipoContatoOption"
              label="Tipo de Contato"
              name="type"
            />
            <InputDefault
              v-if="formFields.tipoContatoOption?.key === 'EMAIL'"
              v-model="formFields.email"
              type="text"
              label="Email"
              name="email"
              placeholder="seuemail@dominio.com"
            />
            <InputPhone
              v-if="['CELULAR', 'TELEFONE'].includes(formFields.tipoContatoOption?.key)"
              v-model="formFields.telefone"
            />
          </div>
        </div>
        <div class="form-input-container">
          <span>Outros</span>
          <div class="form-input-wrapper">
            <InputDefault v-model="formFields.tag" type="text" label="Descrição" name="tag" />
            <InputCheck v-model="formFields.privado" type="text" label="Privado" name="private" />
          </div>
        </div>
        <div class="form-button-wrapper">
          <button class="default-button" type="reset">Restaurar</button>
          <button class="default-button" type="submit">Enviar</button>
          <button class="close-button" type="button" @click="contactSwitch">
            <span class="not-visible">close</span>X
          </button>
        </div>
      </form>
    </div>
  </ModalBackground>
</template>
<style scoped></style>
<!-- 
  {
    "email": "string",
    "id": 0,
    "pessoa": {
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
    },
    "privado": true,
    "tag": "string",
    "telefone": "string",
    "tipoContato": "CELULAR",
    "usuario": {
      "cpf": "string",
      "dataNascimento": "2025-01-28",
      "email": "string",
      "id": 0,
      "nome": "string",
      "password": "string",
      "telefone": "string",
      "username": "string"
    }
  } -->
