import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '@/components/inputs/InputCheck.vue'

describe('Checkbox.vue', () => {
  it('label é exibido corretamente', () => {
    const wrapper = mount(Checkbox, {
      props: { label: 'Aceito os termos', name: 'remember' },
    })

    expect(wrapper.find('label').text()).toBe('Aceito os termos')
  })

  it('deve alterar e espelhar os valores corretamente', async () => {
    const wrapper = mount(Checkbox, {
      props: { name: 'remember' },
      modelValue: false,
    })

    const checkbox = wrapper.find("input[type='checkbox']")

    // Deve começar desmarcado assim como o 'modelValue'
    expect(checkbox.element.checked).toBe(false)

    await checkbox.setValue(true)
    expect(checkbox.element.checked).toBe(true)

    await checkbox.setValue(false)
    expect(checkbox.element.checked).toBe(false)
  })

  it('name do input deve ser adicionado corretamente', () => {
    const wrapper = mount(Checkbox, {
      props: { name: 'remember' },
    })

    expect(wrapper.find('input').attributes('name')).toBe('remember')
  })
})
