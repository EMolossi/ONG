document.addEventListener('DOMContentLoaded', function() {
    
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
            if (cpf.length !== 11) {
                e.preventDefault();
                alert('Por favor, digite um CPF válido com 11 dígitos.');
                document.getElementById('cpf').focus();
                return false;
            }

            const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
            if (telefone.length < 10) {
                e.preventDefault();
                alert('Por favor, digite um telefone válido com DDD.');
                document.getElementById('telefone').focus();
                return false;
            }

            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length !== 8) {
                e.preventDefault();
                alert('Por favor, digite um CEP válido com 8 dígitos.');
                document.getElementById('cep').focus();
                return false;
            }

            const termos = document.getElementById('termos');
            if (termos && !termos.checked) {
                e.preventDefault();
                alert('Você precisa aceitar os termos e condições para continuar.');
                termos.focus();
                return false;
            }

            return true;
        });
    }

    if (cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            
            if (cep.length === 8) {
                
                console.log('CEP informado:', cep);
            }
        });
    }

    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.validity.valid) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        });
    });

    const mensagemTextarea = document.getElementById('mensagem');
    if (mensagemTextarea) {
        const maxLength = mensagemTextarea.getAttribute('maxlength');
        
        const counter = document.createElement('small');
        counter.className = 'form-help';
        counter.style.float = 'right';
        
        mensagemTextarea.parentNode.appendChild(counter);
        
        mensagemTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#e53e3e';
            } else {
                counter.style.color = '#718096';
            }
        });
        
        mensagemTextarea.dispatchEvent(new Event('input'));
    }

    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            const hasContent = Array.from(inputs).some(input => input.value.trim() !== '');
            
            if (hasContent) {
                if (!confirm('Tem certeza que deseja limpar todos os campos do formulário?')) {
                    e.preventDefault();
                }
            }
        });
    }

    if (form) {
        let isSubmitting = false;
        
        form.addEventListener('submit', function(e) {
            if (isSubmitting) {
                e.preventDefault();
                return false;
            }
            
            isSubmitting = true;
            
            // Desabilita botão de submit
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }
        });
    }

    console.log('✓ Scripts de máscara e validação carregados com sucesso!');
});