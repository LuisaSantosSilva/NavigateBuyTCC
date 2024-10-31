def cadastro_corpo_email(code):
    return f"""
            <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
                <!-- Cabeçalho -->
                <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                    <h2 style="margin: 0;">Código de Confirmação</h2><hr style="width: 50%; color: #FFFFFF;">
                </div>
                <div style="background-color: #F5F5F5;">
                    <!-- Mensagem de boas-vindas -->
                    <div style="padding: 20px; text-align: center;">
                        <h3 style="color: #000000;">Seja Bem Vindo(a) ao <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span> </span></h3>
                    </div>
                    
                    <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">
                    
                    <!-- Corpo do e-mail -->
                    <div style="padding: 20px; text-align: left;">
                        <p style="font-size: 18px; font-weight: bold; color: #000000;">
                            Olá, ficamos felizes de termos você conosco,
                        </p>
                        <p style="font-size: 16px; color: #000000;">
                            Aqui você pode comparar preços, analisar avaliações de outros consumidores e encontrar as melhores ofertas em lojas populares com boa reputação.
                        </p>
                        <p style="font-size: 12px; color: #000000;">
                            Ao utilizar nosso sistema, você concorda com nossos termos de uso. Não se esqueça de lê-los.
                        </p>
                    </div>

                    <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                    <!-- Código de confirmação -->
                    <div style="padding: 20px; text-align: center;">
                        <h3 style="color: #000000;">Seu código de confirmação é: <strong style="color: #0C8249;">{code}</strong></h3>
                        <p style="font-size: 18px; color: #000000;">Use este código para confirmar seu email.</p>
                    </div>

                    <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                    <!-- Rodapé -->
                    <div style="padding: 18px; text-align: center;">
                        <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                        <div style="padding: 10px; text-align: left;">
                            <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                        </div>
                    </div>
                    
                    <!-- Direitos reservados -->
                    <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                        <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                        <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                        <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                    </div>
                </div>    
            </div>
                """

def redefinir_corpo_email(link_redefinicao):
    return f"""
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
            <!-- Cabeçalho -->
            <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                <h2 style="margin: 0;">Redefinição de Senha</h2><hr style="width: 50%; color: #FFFFFF;">
            </div>

            <div style="background-color: #F5F5F5;">
                <!-- Mensagem de boas-vindas -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Seja Bem Vindo(a) ao <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span> </span></h3>
                </div>
                
                <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">
                
                <!-- Corpo do e-mail -->
                <div style="padding: 20px; text-align: left;">
                    <p style="font-size: 18px; font-weight: bold; color: #000000;">
                        Olá, ficamos felizes de termos você conosco,
                    </p>
                    <p style="font-size: 16px; color: #000000;">
                        Aqui você pode comparar preços, analisar avaliações de outros consumidores e encontrar as melhores ofertas em lojas populares com boa reputação.
                    </p>
                    <p style="font-size: 12px; color: #000000;">
                        Ao utilizar nosso sistema, você concorda com nossos termos de uso. Não se esqueça de lê-los.
                    </p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Botão de Redefinição -->
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Clique no botão abaixo para redefinir sua senha:</h3>
                    <a href="{link_redefinicao}" style="padding: 10px 20px; background-color: #0C8249; color: #FFFFFF; border-radius: 5px;">Redefinir Senha</a>
                    <p style="font-size: 18px; color: #000000;">Use este link para redefinir sua senha.</p>
                    <p style="font-size: 18px; color: #000000;">Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <!-- Rodapé -->
                <div style="padding: 18px; text-align: center;">
                    <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                    <div style="padding: 10px; text-align: left;">
                        <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                    </div>
                </div>
                
                <!-- Direitos reservados -->
                <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                    <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                    <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                    <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                </div>
            </div>    
        </div>    
        """

def alerta_corpo_email(user, favoritos):
    produtos_lista = ''.join(
        f"""
        <tr style="background-color: #F9F9F9; border-bottom: 1px solid #DDDDDD;">
            <td style="padding: 10px; text-align: center;">
                <img src="{produto.imagem}" alt="{produto.título}" style="width: 60px; height: auto; border-radius: 5px;">
            </td>
            <td style="padding: 10px;">{produto.título}</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; color: #0C0440;">R$ {produto.preço}</td>
        </tr>
        """ for produto in favoritos
    )

    corpo_email = f"""
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #0c0440, #0C8249); padding: 20px; text-align: center; color: #FFFFFF;">
                <h2 style="margin: 0;">Alertas de Produtos Favoritados</h2><hr style="width: 50%; color: #FFFFFF;">
            </div>

            <div style="background-color: #F5F5F5;">
                <div style="padding: 20px; text-align: center;">
                    <h3 style="color: #000000;">Novidades sobre seus produtos favoritos no <span style="color: #0C0440;">Navigate <span style="color: #0C8249;">Buy</span></span></h3>
                </div>
                
                <hr style="width:100%; height:3px; border-width:0; background-color:#000000;">

                <div style="padding: 20px; text-align: left;">
                    <p style="font-size: 18px; font-weight: bold; color: #000000;">Olá, {user.username}!</p>
                    <p style="font-size: 16px; color: #000000;">
                        Aqui estão as últimas atualizações sobre seus produtos favoritos. Não perca as melhores ofertas disponíveis este mês!
                    </p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background-color: #0C8249; color: #FFFFFF; text-align: left;">
                                <th style="padding: 10px; width: 80px;">Imagem</th>
                                <th style="padding: 10px;">Título</th>
                                <th style="padding: 10px; text-align: right;">Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos_lista}
                        </tbody>
                    </table>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <div style="padding: 20px; text-align: center;">
                    <a href="http://localhost:3000/perfil/favoritos" style="padding: 10px 20px; background-color: #0C8249; color: #FFFFFF; border-radius: 5px;">Ver Produtos Favoritos</a>
                </div>

                <hr style="width:75%; height:3px; border-width:0; background-color:#000000;">

                <div style="padding: 18px; text-align: center;">
                    <p style="font-size: 14px; font-weight: bold; color: #000000;">Navegue com simplicidade e pesquise com mais segurança!</p>
                    <div style="padding: 10px; text-align: left;">
                        <p style="font-size: 14px; color: #000000;">Atenciosamente,<br>Equipe Navigate Buy</p>
                    </div>
                </div>
                
                <div style="background: #000000; padding: 20px; text-align: center; color: #FFFFFF;">
                    <hr style="width:75%; height:3px; border-width:0; background: linear-gradient(to right, #0c0440, #0C8249);">
                    <p style="font-size: 12px; margin: 0;">Todos os direitos reservados a Navigate Buy © 2024</p><br>
                    <p style="font-size: 12px; margin: 0;">Trabalho de Conclusão de Curso</p>
                </div>
            </div>    
        </div>
    """
    
    return corpo_email