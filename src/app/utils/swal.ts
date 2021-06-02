import swal from 'sweetalert2';

export class Swal {
    msgAlert(titulo, texto, icon, botao?) {

        let options = {
            title: titulo,
            text: texto,
            icon: icon
        }

        if (botao == null) {
            options['showConfirmButton'] = false
            options['timer'] = 2000
        } else {
            options['confirmButtonText'] = botao
        }

        swal.fire(options);
    }

    confirmAlertCustom(titulo, texto, icon, confBtnText, cancelBtnText, callbackSuccess?, callbackCancel?) {
        swal.fire({
            title: titulo,
            text: texto,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confBtnText,
            confirmButtonColor: "#3085d6",
            cancelButtonText: cancelBtnText,
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed && callbackSuccess != null) {
                callbackSuccess.callback()
            } else if (result.isDismissed && callbackCancel != null) {
                callbackCancel.callback()
            }
        })
    }
}
