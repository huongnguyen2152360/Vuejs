import { shallowMount } from '@vue/test-utils'
import NumberRenderer from '@/components/NumberRenderer.vue'

const factory = (even) => {
    return shallowMount(NumberRenderer, {
        propsData: {
            ...even
        }
    })
} 

describe("NumberRenderer.vue", () => {
    it("renders even numbers", () => {
        const wrapper = factory({even: true});
        expect(wrapper.text()).toBe("2, 4, 6, 8");
    })

    it("renders odd numbers", () => {
        const localThis = {even: false};
        expect(NumberRenderer.computed.numbers.call(localThis)).toBe("1, 3, 5, 7, 9");
    })
})