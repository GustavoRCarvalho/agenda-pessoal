import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateInput from '@/components/inputs/InputDate.vue'

describe('DateInput.vue', () => {
  it('adiciona a classe "active" no label quando o input está em foco ou tem valor', async () => {
    const wrapper = mount(DateInput)

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    // adiciona foco e o label sobe
    await input.trigger('focusin')
    expect(label.classes()).toContain('active')

    // remove foco e o label abaixa
    await input.trigger('focusout')
    expect(label.classes()).not.toContain('active')

    // adiciona valor e o label sobe de novo
    await input.setValue('2000-01-01')
    expect(label.classes()).toContain('active')

    expect(wrapper.find('label').classes()).toContain('active')
  })

  it('não deve permitir dats maiores que o ano vigente', async () => {
    const wrapper = mount(DateInput)
    const input = wrapper.find('input')

    // Define uma data que ainda não exitiu (ano atual + 1)
    const nextYear = new Date().getFullYear() + 1
    await input.setValue(`${nextYear}-01-01`)

    expect(input.element.validity.valid).toBe(false)
  })

  it('deve estar inválido quando vazio', async () => {
    const wrapper = mount(DateInput)
    const input = wrapper.find('input')

    await input.setValue('')

    expect(input.element.validity.valid).toBe(false)
  })
})
