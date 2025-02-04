import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputDefault from '@/components/inputs/InputDefault.vue' // Ajuste o caminho conforme necessário

describe('InputDefault', () => {
  it('renderiza com as props default', () => {
    const wrapper = mount(InputDefault)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('')
  })

  it('renderiza o label', () => {
    const label = 'Nome de Usuário'
    const wrapper = mount(InputDefault, {
      props: {
        label,
      },
    })
    expect(wrapper.find('label').text()).toBe(label)
  })

  it('adiciona a classe "active" no label quando o input está em foco ou tem valor', async () => {
    const wrapper = mount(InputDefault, {
      props: {
        label: 'Nome de Usuário',
      },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    await input.trigger('focusin')
    expect(label.classes()).toContain('active')

    await input.trigger('focusout')
    expect(label.classes()).not.toContain('active')

    await input.setValue('John Doe')
    expect(label.classes()).toContain('active')
  })

  it('exibe a mensagem de erro quando errorMessage é passado', async () => {
    const errorMessage = 'Campo obrigatório'
    const wrapper = mount(InputDefault, {
      props: {
        errorMessage,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('input')

    expect(wrapper.vm.valid).toBe(false)
    expect(wrapper.find('div').classes()).toContain('hasError')
  })
})
