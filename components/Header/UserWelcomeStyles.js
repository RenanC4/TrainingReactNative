<KeyboardAvoidingView style={style.container} behavior="padding">
        <LoaderModal loading={this.props.isOnRequest}/>
        <Image style={style.logo} source={LogoGreenImg}/>
        <Text style={style.message}>Entrar com email e senha</Text>
      
        <View style={style.containerMain}>
          <Image style={style.infoImage} source={UserIcon}/>
          <TextInput underlineColorAndroid='#96989b' value={this.state.username}
                     onChangeText={(text) => this.setState({username: text, error: ''})}
                     placeholder="Email" style={style.textInput}/>
        </View>
        <View style={style.containerMain}>
          <Image style={style.infoImage} source={PasswordIcon}/>
          <TextInput underlineColorAndroid='#96989b' value={this.state.password}
                     onChangeText={(text) => this.setState({password: text, error: ''})}
                     secureTextEntry={true} placeholder="Senha" style={style.textInput}/>
        </View>
        <Text style={style.forgetPasswordText}>
          Esqueceu sua senha? 
          <Text style={{fontWeight:'bold'}} onPress={() => {
          this._handleResetFlow(this.state.username);
        }}>
          clique aqui
          </Text>
        </Text>
        <Button rounded style={style.button} onPress={() => {
          this._handleLoginFlow(this.state.username, this.state.password);
        }}>
          <Text style={style.buttonText}>Entrar/Criar</Text>
        </Button>
        <Text style={style.orSeparator}>-- OU --</Text>

        <Button rounded style={style.buttonFacebook} onPress={() => {
         this._facebookLogin();
        }}>

          <Text style={style.buttonText}>  Entrar com o <Image style={style.fbLogo} source={FB}/>acebook</Text>
        </Button>
        <Snackbar
          visible={this.state.snackVisible && this.state.error}
          onDismiss={() => this._showMessage(null, false)}>
          {this.state.error}
        </Snackbar>
      </KeyboardAvoidingView>