export default {
    mounted(el, bindings) {
        const oRemoveBtn = el.querySelector('.remove-btn');
        const {cellData, weekday, timeSlot} = bindings.value;
        oRemoveBtn.addEventListener('click', handleRemovePanel, false);

        function handleRemovePanel() {
            delete cellData[`${weekday}-${timeSlot}`];
        }

    }
}
