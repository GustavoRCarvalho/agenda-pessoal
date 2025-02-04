import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputSelect from '@/components/inputs/InputSelect.vue'
import VueSelect from 'vue-select'

describe('InputSelect.vue', () => {
  const options = [
    { key: 'ROLE_ADMIN', label: 'Administrador' },
    { key: 'ROLE_USER', label: 'Usuário' },
  ]

  it('renderiza corretamente', () => {
    const wrapper = mount(InputSelect, {
      props: {
        label: 'Selecione o tipo',
        name: 'tipo',
        options,
      },
    })

    expect(wrapper.find('label').text()).toBe('Selecione o tipo')
    expect(wrapper.findComponent(VueSelect).exists()).toBe(true)
  })

  it('renderiza todas as opções', async () => {
    const wrapper = mount(InputSelect, {
      props: {
        options,
      },
    })

    const select = wrapper.findComponent(VueSelect)
    expect(select.props('options')).toEqual(options)
  })

  it('atualiza a model quando um item é selecionado', async () => {
    const wrapper = mount(InputSelect, {
      props: {
        options,
      },
    })

    const select = wrapper.findComponent(VueSelect)

    await select.vm.$emit('update:modelValue', options[1])

    expect(wrapper.vm.model).toEqual(options[1])
  })

  it('exibe erro quando nenhum item é selecionado', async () => {
    const wrapper = mount(InputSelect, {
      props: { options },
    })

    const input = wrapper.find('input.vs__search')

    await input.trigger('invalid')

    expect(input.element.validity.valueMissing).toBe(true)
  })
})
