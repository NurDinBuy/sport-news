// // Modal
//
const modal = document.querySelector('.modal');
const modalTriggerBtn = document.querySelector('#btn-get');
const modalCloseBtn = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTriggerBtn.onclick = () => openModal();
modalCloseBtn.onclick = () => closeModal();

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}
setTimeout(openModal, 10000);

// let modalTriggered = false;
//
// const onScrollDown = () => {
//     if (!modalTriggered && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         openModal();
//         modalTriggered = true;
//         window.removeEventListener('scroll', onScrollDown);
//     }
// };
//
// window.addEventListener('scroll', onScrollDown);

