import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput from '@/components/inputs/InputPhone.vue'

describe('PhoneInput.vue', () => {
  it('deve exibir o label corretamente', () => {
    const wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    })

    expect(wrapper.find('label').text()).toBe('Telefone/Celular')
  })

  it('deve refletir o valor do v-model corretamente', async () => {
    const wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')

    await input.setValue('11987654321')

    expect(wrapper.vm.model).toBe('11987654321')
  })

  it('deve alterar isFocus ao focar e desfocar o input', async () => {
    const wrapper = mount(PhoneInput, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')

    expect(wrapper.vm.isFocus).toBe(false)

    await input.trigger('focusin')
    expect(wrapper.vm.isFocus).toBe(true)

    await input.trigger('focusout')
    expect(wrapper.vm.isFocus).toBe(false)
  })
})
