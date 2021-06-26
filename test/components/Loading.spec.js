import { mount } from '@vue/test-utils'
import Loading from '@/components/Loading.vue'

describe('Component Loading', () => {
  test('component data', () => {
    const wrapper = mount(Loading)
    console.log(wrapper.vm.$data)
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.vm).toBeTruthy()
  })
})
