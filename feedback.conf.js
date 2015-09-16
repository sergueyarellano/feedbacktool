(function () {
  $B.provide($B, 'app');

  var detallesOperativa = {},
    individualCarrys = {},
    carryList = {};

  //Carrys repetidos en varios carryList.
  individualCarrys.origen = {};
  individualCarrys.origen.bannerOC = {
    'carryName': 'carry_origen',
    'modelParamName': {'infoContratacion.banner': true},
    'modelValue': 'OrigenBannerOneClick',
    'carry_type': 'ComparaModelo'
  };
  individualCarrys.origen.bannerPG = {
    'carryName': 'carry_origen',
    'modelParamName': {'infoContratacion.bocadillo': true},
    'modelValue': 'OrigenBannerPosGlobal',
    'carry_type': 'ComparaModelo'
  };
  individualCarrys.origen.botonVerde = {
    'carryName': 'carry_origen',
    'modelParamName': {
      'infoContratacion.bocadillo' : null,
      'infoContratacion.banner' : null
    },
    'modelValue': 'OrigenBotonVerde',
    'carry_type': 'ComparaModelo'
  };

  individualCarrys.tipoProducto = {};
  individualCarrys.tipoProducto.descripcionProducto = {
    'carryName': 'carry_tipoproducto',
    'modelParamName': 'infoContratacion.registroContrato.descripcionProducto',
    'carry_type': 'LecturaModelo'
  };
  individualCarrys.tipoProducto.firmaElectronica = {
    'carryName': 'carry_tipoproducto',
    'modelParamName': 'producto',
    'carry_type': 'LecturaModelo'
  };


  //objetos para no repetir los carry en cada detalleOperativa
  carryList.carryAltaCitaPrevia = {
    'carryName': 'carry_tipo',
    'modelParamName': 'codTipoCita',
    'carry_type': 'LecturaModelo'
  };
  carryList.financiacionRecibo = [{
    'carryName': 'carry_origen',
    'modelParamName': {'banner': 'true'},
    'modelValue': 'OrigenBannerOneClick',
    'carry_type': 'ComparaModelo'
  }, {
    'carryName': 'carry_origen',
    'modelParamName': {'bocadillo': 'true'},
    'modelValue': 'OrigenBannerPosGlobal',
    'carry_type': 'ComparaModelo'
  }, {
    'carryName': 'carry_origen',
    'modelParamName': {'bocadillo' : null, 'banner' : null},
    'modelValue': 'OrigenBotonVerde',
    'carry_type': 'ComparaModelo'
  }];
  carryList.carryFirmaElectronicaDepositosCuentas = [
    {
      'carryName': 'carry_tipo',
      'carryValue': 'depositoscuentas',
      'carry_type': 'ValorFijo'
    },
    individualCarrys.tipoProducto.firmaElectronica
  ];
  carryList.carryFirmaElectronicaTarjetas = [
    {
      'carryName': 'carry_tipo',
      'carryValue': 'tarjetas',
      'carry_type': 'ValorFijo'
    },
    individualCarrys.tipoProducto.firmaElectronica
  ];
  carryList.carryFirmaElectronicaConsumo = [
    {
      'carryName': 'carry_tipo',
      'carryValue': 'consumo',
      'carry_type': 'ValorFijo'
    },
    individualCarrys.tipoProducto.firmaElectronica  
  ];
  carryList.carryFirmaElectronicaPlanes = [
    {
      'carryName': 'carry_tipo',
      'carryValue': 'planes',
      'carry_type': 'ValorFijo'
    },
    individualCarrys.tipoProducto.firmaElectronica
  ];
  carryList.carryFirmaElectronicaFondos = [
    {
      'carryName': 'carry_tipo',
      'carryValue': 'fondos',
      'carry_type': 'ValorFijo'
    },
    individualCarrys.tipoProducto.firmaElectronica
  ];
  carryList.carryFirmaMultiproducto = [{
    'carryName': 'carry_tipo',
    'carryValue': 'multiproducto',
    'carry_type': 'ValorFijo'
  }, {
    'carryName': 'carry_tipoproducto',
    'carryArrayModel': 'condIntDocMultiproducto',
    'modelParamName': 'nombreProducto',
    'carry_type': 'LecturaArrayModelo'
  }];
  carryList.carryTransferenciasyTraspaso = [{
    'carryName': 'carry_tipo',
    'modelParamName': 'momentoEnvio',
    'carry_type': 'LecturaModelo'
  }];
  carryList.carryCompraVentaValores = [{
    'carryName': 'carry_tipo',
    'modelParamName': {'tipoOrden': 'NORMAL'},
    'modelValue': 'NORMAL',
    'carry_type': 'ComparaModelo'
  }, {
    'carryName': 'carry_tipo',
    'modelParamName': {'tipoOrden': 'CONDICIONADA'},
    'modelValue': 'CONDICIONADA',
    'carry_type': 'ComparaModelo'
  }, {
    'carryName': 'carry_tipo',
    'modelParamName': {'tipoOrden': 'STOP_LOSS'},
    'modelValue': 'STOP_LOSS',
    'carry_type': 'ComparaModelo'
  }];
  carryList.carryContratacionCuentasyTarjetasyDepositos = [
    individualCarrys.tipoProducto.descripcionProducto,
    individualCarrys.origen.bannerOC,
    individualCarrys.origen.bannerPG,
    individualCarrys.origen.botonVerde
  ];
  carryList.carryContratacionFondosyPlanes = [
    {
      'carryName': 'carry_tipo',
      'modelParamName': {'seleccionCuenta': true, 'seleccionFondoExterno': true},
      'modelValue': 'CuentaYFondoExterno',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_tipo',
      'modelParamName': {'seleccionCuenta': true, 'seleccionFondoExterno': false},
      'modelValue': 'CuentaExterna',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_tipo',
      'modelParamName': {'seleccionCuenta': false, 'seleccionFondoExterno': true},
      'modelValue': 'FondoExterno',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {
        'aportacionPeriodicaFormDto.aportacionPeriodica': 'fondo.aportacionPeriodica.revalorizacionperiodica_'
      },
      'modelValue': 'AportacionNoPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Mensual'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Bimestral'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Trimestral'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Cuatrimestral'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Semestral'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo',
      'modelParamName': {'aportacionPeriodicaFormDto.aportacionPeriodica': 'Anual'},
      'modelValue': 'AportacionPeriodica',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo2',
      'modelParamName': {'campanyaSeleccionada.tipoAdhesion': 'A'},
      'modelValue': 'CampanyaSi',
      'carry_type': 'ComparaModelo'
    }, {
      'carryName': 'carry_subtipo2',
      'modelParamName': {'campanyaSeleccionada.tipoAdhesion': 'N'},
      'modelValue': 'CampanyaNo',
      'carry_type': 'ComparaModelo'
    },
    individualCarrys.origen.bannerOC,
    individualCarrys.origen.bannerPG,
    individualCarrys.origen.botonVerde,
    individualCarrys.tipoProducto.descripcionProducto
  ];
  carryList.carryOCCocheResto = [{
    'carryName': 'carry_origen',
    'modelParamName': 'from',
    'carry_type': 'LecturaModelo'
  }, {
    'carryName': 'carry_tipo',
    'modelParamName': {'oclCoche': 'true'},
    'modelValue': 'OC_Coche',
    'carry_type': 'ComparaModelo'
  }, {
    'carryName': 'carry_tipo',
    'modelParamName': {'oclCoche': 'false'},
    'modelValue': 'OC_Resto',
    'carry_type': 'ComparaModelo'
  }];


  //objeto de configuracion de alta de cita previa
  detallesOperativa.altaCitaPreviaAbandono = {
    'urlLocation': ['citaprevia'],
    'listaDatosModelo': [{
      'tipoOperacion': 'ALTA'
    }],
    'id': 'solicitud_citaprevia_abandono_web',
    'additional_carry': [carryList.carryAltaCitaPrevia]
  };
  detallesOperativa.altaCitaPreviaExito = {
    'urlLocation': ['citaprevia'],
    'listaDatosModelo': [{
      'tipoOperacion': 'ALTA',
      'created': true
    }],
    'id': 'solicitud_citaprevia_web',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': [carryList.carryAltaCitaPrevia]
  };
  //objeto de configuracion de posicion global
  detallesOperativa.posicionglobal = {
    'urlLocation': ['posicion-global'],
    'id': 'pull_push_Posicionglobal_Web_2col',
    'noModelButton': true,
    'additionalButtonClasses': 'posicion_global',
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //objeto de configuracion de recarga de movil
  detallesOperativa.recargaMovilAbandono = {
    'urlLocation': ['cuentas/:producto/recargamovil'],
    'id': 'push_recarga_telefono_abandono',
    'events': ['handlePestanasCloseCliked'],
    'excludeDataLinks': ['areapersonal/menu/contactos']
  };
  detallesOperativa.recargaMovilExito = {
    'urlLocation': ['cuentas/:producto/recargamovil'],
    'id': 'pull_push_recarga_telefono_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  detallesOperativa.pagoRecibosAbandono = {
    'urlLocation': ['pagosnodomiciliados/pagos'],
    'id': 'push_pago_recibo_abandono',
    'events': ['handlePestanasCloseCliked']
  };
  detallesOperativa.pagoRecibosExito = {
    'urlLocation': ['pagosnodomiciliados/pagos'],
    'id': 'pull_push_pago_recibo_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  detallesOperativa.recibosDevolucionAbandono = {
    'urlLocation': ['recibos/:producto/devolver'],
    'id': 'push_devolver_recibo_abandono',
    'events': ['closeDialogModal']
  };
  detallesOperativa.recibosDevolucionExito = {
    'urlLocation': ['recibos/:producto/devolver'],
    'id': 'pull_push_devolver_recibo_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['closeDialogModal'],
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //objeto de configuracion de transferencia
  detallesOperativa.transferenciaAbandono = {
    'urlLocation': ['cuentas/:producto/transferenciasnueva'],
    'listaDatosModelo': [{
      'tipoEnvioDinero': 'TRANSFERENCIA'
    }],
    'id': 'push_transferencia_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryTransferenciasyTraspaso,
    'excludeDataLinks': ['areapersonal/menu/contactos']
  };
  detallesOperativa.transferenciaExito = {
    'urlLocation': ['cuentas/:producto/transferenciasnueva'],
    'listaDatosModelo': [{
      'tipoEnvioDinero': 'TRANSFERENCIA'
    }],
    'additionalButtonClasses': 'fb_marginTop',
    'id': 'pull_push_transferencia_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryTransferenciasyTraspaso
  };
  //objeto de configuracion de traspaso
  detallesOperativa.traspasoAbandono = {
    'urlLocation': ['cuentas/:producto/transferenciasnueva'],
    'listaDatosModelo': [{
      'tipoEnvioDinero': 'TRASPASO'
    }],
    'id': 'push_traspaso_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryTransferenciasyTraspaso
  };
  detallesOperativa.traspasoExito = {
    'urlLocation': ['cuentas/:producto/transferenciasnueva'],
    'listaDatosModelo': [{
      'tipoEnvioDinero': 'TRASPASO'
    }],
    'additionalButtonClasses': 'fb_marginTop',
    'id': 'pull_push_traspaso_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryTransferenciasyTraspaso
  };
  //objeto de configuracion de aportacion a planes
  detallesOperativa.planesAportacionExtraordinariaAbandono = {
    'urlLocation': ['planes/:producto/aportacionextraordinaria'],
    'id': 'OCPPI_aportacion_abandono',
    'events': ['handlePestanasCloseCliked']
  };
  detallesOperativa.planesAportacionExtraordinariaExito = {
    'urlLocation': ['planes/:producto/aportacionextraordinaria'],
    'id': 'OCPPI_aportacion_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //objeto de configuracion de recarga movil
  detallesOperativa.tarjetasRecargaMovilAbandono = {
    'urlLocation': ['tarjetas/:producto/recargamovil'],
    'id': 'push_recarga_telefono_abandono',
    'events': ['handlePestanasCloseCliked'],
    'excludeDataLinks': ['areapersonal/menu/contactos']
  };
  detallesOperativa.tarjetasRecargaMovilExito = {
    'urlLocation': ['tarjetas/:producto/recargamovil'],
    'id': 'pull_push_recarga_telefono_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //objeto de configuracion de compra de valores
  detallesOperativa.valoresCompraAbandono = {
    'urlLocation': ['valores/:producto/compraventa'],
    'listaDatosModelo': [{
      'tipoOperacionActual': 'COMPRA',
      'tipoInversionActual': 'VALORES'
    }],
    'id': 'push_compra_acciones_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryCompraVentaValores
  };
  detallesOperativa.valoresCompraExito = {
    'urlLocation': ['valores/:producto/compraventa'],
    'listaDatosModelo': [{
      'tipoOperacionActual': 'COMPRA',
      'tipoInversionActual': 'VALORES'
    }],
    'id': 'pull_push_compra_acciones_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryCompraVentaValores
  };
  //objeto de configuracion de venta de valores
  detallesOperativa.valoresVentaAbandono = {
    'urlLocation': ['valores/:producto/compraventa'],
    'listaDatosModelo': [{
      'tipoOperacionActual': 'VENTA',
      'tipoInversionActual': 'VALORES'
    }],
    'id': 'push_venta_acciones_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryCompraVentaValores
  };
  detallesOperativa.valoresVentaExito = {
    'urlLocation': ['valores/:producto/compraventa'],
    'listaDatosModelo': [{
      'tipoOperacionActual': 'VENTA',
      'tipoInversionActual': 'VALORES'
    }],
    'id': 'pull_push_venta_acciones_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryCompraVentaValores
  };
  //objeto de configuracion de contratacion de cuentas
  detallesOperativa.cuentasAbandono = {
    'urlLocation': ['contratacion',
      'contratacion/contrataciondirecta',
      'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Cuentas'
    }],
    'id': 'push_contrat_cuentas_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.cuentasExito = {
    'urlLocation': ['contratacion',
      'contratacion/contrataciondirecta',
      'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Cuentas'
    }],
    'id': 'pull_push_contrat_cuentas_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  //objeto de configuracion de contratacion de tarjetas
  detallesOperativa.tarjetasDebitoAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'TarjetasDebito'
    }],
    'id': 'push_contrat_tarjetas_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.tarjetasDebitoExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'TarjetasDebito'
    }],
    'id': 'pull_push_contrat_tarjetas_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.tarjetasPrepagoAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'TarjetasPrepago'
    }],
    'id': 'push_contrat_tarjetas_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.tarjetasPrepagoExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'TarjetasPrepago'
    }],
    'id': 'pull_push_contrat_tarjetas_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  //objeto de configuracion de contratacion de fondos
  detallesOperativa.fondosAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Fondos'
    }],
    'id': 'push_contrat_fondos_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionFondosyPlanes
  };
  detallesOperativa.fondosExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'categoriaProducto': 'Fondos'
    }],
    'id': 'pull_push_contrat_fondos_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionFondosyPlanes
  };
  //objeto de configuracion de contratacion de planes
  detallesOperativa.planesAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Planes'
    }],
    'id': 'OCPPI_alta_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionFondosyPlanes
  };
  detallesOperativa.planesExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Planes'
    }],
    'id': 'OCPPI_alta_exito',
    'events': ['handlePestanasCloseCliked'],
    'additionalButtonClasses': 'contratacion_planes',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionFondosyPlanes
  };

  //objeto de configuracion de contratacion de depositos
  detallesOperativa.depositosAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Depositos'
    }],
    'id': 'push_contrat_depositos_abandono',
    'events': ['handlePestanasCloseCliked'],
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.depositosExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'infoContratacion.categoriaProducto': 'Depositos'
    }],
    'id': 'pull_push_contrat_depositos_exito',
    'events': ['handlePestanasCloseCliked'],
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryContratacionCuentasyTarjetasyDepositos
  };
  detallesOperativa.firmaElectronicaDepositoscuentasAbandono = {
    'urlLocation': ['cestatareas/ejecutar/depositoscuentas'],
    'id': 'push_firmaelectronica_net_abandono',
    'additional_carry': carryList.carryFirmaElectronicaDepositosCuentas
  };
  detallesOperativa.firmaElectronicaDepositoscuentasExito = {
    'urlLocation': ['cestatareas/ejecutar/depositoscuentas'],
    'id': 'pull_push_firmadiferida_net_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryFirmaElectronicaDepositosCuentas
  };
  //objeto de configuracion de financiacion recibo tarjeta
  detallesOperativa.financiacionReciboAbandono = {
    'urlLocation': ['tarjetas/financiacionrecibo'],
    'listaDatosModelo': [{
      'sourceId': '0070'
    }],
    'id': 'push_oneclick_recibo_tarj_abandono',
    'additional_carry': carryList.financiacionRecibo
  };
  detallesOperativa.financiacionReciboExito = {
    'urlLocation': ['tarjetas/financiacionrecibo'],
    'id': 'pull_push_oneclick_recibo_tarj_exito',
    'listaDatosModelo': [{
      'sourceId': '0070'
    }],
    'additionalButtonClasses': 'fb_floatRight',
    'botonType': 'boton_feedback_fondo_azul_cuadrado',
    'additional_carry': carryList.financiacionRecibo
  };


  detallesOperativa.firmaElectronicaTarjetasAbandono = {
    'urlLocation': ['cestatareas/ejecutar/tarjetas'],
    'id': 'push_firmaelectronica_net_abandono',
    'additional_carry': carryList.carryFirmaElectronicaTarjetas
  };
  detallesOperativa.firmaElectronicaTarjetasExito = {
    'urlLocation': ['cestatareas/ejecutar/tarjetas'],
    'id': 'pull_push_firmadiferida_net_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryFirmaElectronicaTarjetas
  };
  detallesOperativa.firmaElectronicaConsumoAbandono = {
    'urlLocation': ['cestatareas/ejecutar/consumo'],
    'id': 'push_firmaelectronica_net_abandono', 
    'additional_carry': carryList.carryFirmaElectronicaConsumo
  };
  detallesOperativa.firmaElectronicaConsumoExito = {
    'urlLocation': ['cestatareas/ejecutar/consumo'],
    'id': 'pull_push_firmadiferida_net_exito', 
    'additionalButtonClasses': 'fb_marginTop', 
    'botonType': 'boton_feedback_fondo_azul_redondeado', 
    'additional_carry': carryList.carryFirmaElectronicaConsumo
  };
  detallesOperativa.firmaElectronicaPlanesAbandono = {
    'urlLocation': ['cestatareas/ejecutar/planes'],
    'id': 'push_firmaelectronica_net_abandono',
    'additional_carry': carryList.carryFirmaElectronicaPlanes

  };
  detallesOperativa.firmaElectronicaPlanesExito = {
    'urlLocation': ['cestatareas/ejecutar/planes'],
    'id': 'pull_push_firmadiferida_net_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryFirmaElectronicaPlanes
  };
  detallesOperativa.firmaElectronicaMultiproductoAbandono = {
    'urlLocation': ['cestatareas/ejecutar/multiproducto'],
    'id': 'push_firmaelectronica_net_abandono',
    'additional_carry': carryList.carryFirmaMultiproducto
  };
  detallesOperativa.firmaElectronicaMultiproductoExito = {
    'urlLocation': ['cestatareas/ejecutar/multiproducto'],
    'id': 'pull_push_firmadiferida_net_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryFirmaMultiproducto
  };
  detallesOperativa.firmaElectronicaFondosAbandono = {
    'urlLocation': ['cestatareas/ejecutar/fondos'],
    'id': 'push_firmaelectronica_net_abandono',
    'additional_carry': carryList.carryFirmaElectronicaFondos
  };
  detallesOperativa.firmaElectronicaFondosExito = {
    'urlLocation': ['cestatareas/ejecutar/fondos'],
    'id': 'pull_push_firmadiferida_net_exito',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'additional_carry': carryList.carryFirmaElectronicaFondos
  };
  detallesOperativa.oclAbandono = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'claveAcceso': undefined
    }],
    'id': 'OCL_contratac_abandono'
  };
  detallesOperativa.oclAbandono2 = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'listaDatosModelo': [{
      'claveAcceso': null
    }],
    'id': 'OCL_contratac_abandono'
  };
  detallesOperativa.oclExito = {
    'urlLocation': ['contratacion', 'contratacion/contrataciondirecta', 'contratacion/contrataciondirecta/:producto'],
    'additionalButtonClasses': 'fb_marginTop',
    'id': 'OCL_contratac_exito',
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //Objetos de configuracion de Mi Gestor
  detallesOperativa.miGestorPullGlobal = {
    'urlLocation': ['api/messagethread/clientelogado'],
    'id': 'mi_gestor_uso_pull_1',
    'noModelButton': true,
    'additionalButtonClasses': 'fb_floatRight',
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  detallesOperativa.miGestorAbandonoSinUso = {
    'urlLocation': ['api/messagethread/clientelogado'],
    'listaDatosModelo': [{'interaccionAbrirConversacion': false}],
    'id': 'mi_gestor_no_uso_push',
    'excludeDataLinks': ['citaprevia', 'cestatareas/ejecutar/:producto']
  };
  detallesOperativa.miGestorAbandonoConUso = {
    'urlLocation': ['api/messagethread/clientelogado'],
    'listaDatosModelo': [{'interaccionAbrirConversacion': true}],
    'id': 'mi_gestor_uso_push_1',
    'additionalButtonClasses': 'fb_marginTop',
    'botonType': 'boton_feedback_fondo_azul_redondeado',
    'excludeDataLinks': ['citaprevia', 'cestatareas/ejecutar/:producto']
  };
  detallesOperativa.valoraGestor = {
    'urlLocation': ['api/messagethread/clientelogado', 'posicion-global'],
    'id': 'valora_a_tu_gestor',
    'noModelButton': true,
    'botonType': 'boton_estrellas',
    'answersId': ['E1|web0101']
  };
  detallesOperativa.valoraGestorPresencial = {
    'urlLocation': ['posicion-global'],
    'id': 'valora_a_tu_gestor',
    'noModelButton': true,
    'botonType': 'boton_estrellas',
    'additionalButtonClasses': 'gestor_presencial',
    'answersId': ['E1|web0101']
  };
  detallesOperativa.altaClienteAbandono = {
    'urlLocation': ['public/altaclientesnif'],
    'id': 'hazte_cliente'
  };
  detallesOperativa.ocTraspasoTarjetaCuentaAbandono = {
    'urlLocation': ['traspaso/tarjetacuenta'],
    'id': 'oc_traspaso_a_cuenta_abandono_web'
  };
  detallesOperativa.ocTraspasoTarjetaCuentaExito = {
    'urlLocation': ['traspaso/tarjetacuenta'],
    'id': 'oc_traspaso_a_cuenta_exito_web',
    'additionalButtonClasses': 'fb_floatRight',
    'botonType': 'boton_feedback_fondo_azul_cuadrado'
  };
  detallesOperativa.ocFinanciacionAdeudoAbandono = {
    'urlLocation': ['cuentas/financiacionmovimiento'],
    'id': 'oc_financiacion_adeudo_abandono_web'
  };
  detallesOperativa.ocFinanciacionAdeudoExito = {
    'urlLocation': ['cuentas/financiacionmovimiento'],
    'id': 'oc_financiacion_adeudo_exito_web',
    'additionalButtonClasses': 'fb_floatRight',
    'botonType': 'boton_feedback_fondo_azul_cuadrado'
  };
  detallesOperativa.ocCocheRestoAbandono = {
    'urlLocation': ['prestamoinmediato', 'prestamoinmediato/coche'],
    'id': 'oc_coche_resto_abandono_web',
    'excludeDataLinks': ['prestamoinmediato', 'prestamoinmediato/coche'],
    'additional_carry': carryList.carryOCCocheResto
  };
  detallesOperativa.ocCocheRestoExito = {
    'urlLocation': ['prestamoinmediato', 'prestamoinmediato/coche'],
    'id': 'oc_coche_resto_exito_web',
    'additionalButtonClasses': 'fb_floatRight',
    'botonType': 'boton_feedback_fondo_azul_cuadrado',
    'additional_carry': carryList.carryOCCocheResto
  };

  detallesOperativa.segurosAutoAbandono = {
    'urlLocation': ['segurosauto'],
    'id': 'push_firmaelectronica_net_abandono'
  };

  detallesOperativa.segurosAutoExito = {
    'urlLocation': ['segurosauto'],
    'id': 'mi_gestor_uso_push_1',
    'additionalButtonClasses': 'segurosauto',
    'botonType': 'boton_feedback_fondo_azul_redondeado'
  };
  //FeedDetail

  var FeedbackConf = function () {
    //objeto con la lista de objetos de operativa en las que se pone el opinator
    this.baseConfLocal = {
      //FeedStepConf
      'step 1': [detallesOperativa.noooooooooombreeeAbandono],
      'step 2': [detallesOperativa.noooooooooombreeeAbandono],
      'step 3': [detallesOperativa.noooooooooombreeeExito],

      //Seguros auto simulacion web
      'seguros_auto_mostrar_productos': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_mostrar_marcas_preferentes': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_mostrar_todas_marcas': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_modelos': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_mostrar_todos_modelos': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_matriculacion': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_potencia': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_combustible': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_puertas': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_versiones': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_uso': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_duerme': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_permiso': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_poliza_actual': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_partes': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_preguntas': [detallesOperativa.segurosAutoAbandono],
      'seguros_auto_precio': [detallesOperativa.segurosAutoExito],
      //OC Financiacion Adeudo POR IMPLEMENTAR
      'cuentas-financiacion-movimiento': [detallesOperativa.ocFinanciacionAdeudoAbandono],
      'cuentas-financiacion-movimiento-final': [detallesOperativa.ocFinanciacionAdeudoExito],
      //OC Coche & Resto (antiguo OCL)
      'prestamo-ocl-coche': [detallesOperativa.ocCocheRestoAbandono],
      'prestamo-ocl-coche-final': [detallesOperativa.ocCocheRestoExito],
      //OC Tarjeta Traspaso Efectivo o traspaso tarjeta a cuenta
      'traspaso-tarjeta-cuenta': [detallesOperativa.ocTraspasoTarjetaCuentaAbandono],
      'traspaso-tarjeta-cuenta-final': [detallesOperativa.ocTraspasoTarjetaCuentaExito],
      //miGestor
      'tmpl_migestor': [detallesOperativa.miGestorAbandonoSinUso, detallesOperativa.miGestorAbandonoConUso],
      'boton_feedback_miGestor_global': [detallesOperativa.miGestorPullGlobal],
      'valorar_gestor': [detallesOperativa.valoraGestor],
      'valorar_gestor_presencial': [detallesOperativa.valoraGestorPresencial],

      //posicion global
      'boton_feedback_posicion_global': [detallesOperativa.posicionglobal],

      // financiacionRecibo
      'tarjetas-financiacion-recibo': [detallesOperativa.financiacionReciboAbandono],
      'tarjetas-financiacion-recibo-final': [detallesOperativa.financiacionReciboExito],
      // firma electronica consumo prestamo
      'cestatareas_ejecutar_consumo': [detallesOperativa.firmaElectronicaConsumoAbandono],
      'cestatareas_resumen_consumo': [detallesOperativa.firmaElectronicaConsumoExito],
      //firma electronica depositos y cuentas
      'cestatareas_ejecutar_depositoscuentas': [detallesOperativa.firmaElectronicaDepositoscuentasAbandono],
      'cestatareas_resumen_depositoscuentas': [detallesOperativa.firmaElectronicaDepositoscuentasExito],

      //firma electronica tarjetas
      'cestatareas_ejecutar_tarjetas': [detallesOperativa.firmaElectronicaTarjetasAbandono],
      'cestatareas_resumen_tarjetas': [detallesOperativa.firmaElectronicaTarjetasExito],

      //firma electronica planes
      'cestatareas_ejecutar_planes_despuestres': [detallesOperativa.firmaElectronicaPlanesAbandono],
      'cestatareas_ejecutar_planes': [detallesOperativa.firmaElectronicaPlanesAbandono],
      'cestatareas_resumen_planes': [detallesOperativa.firmaElectronicaPlanesExito],

      //firma electronica multiproducto
      'cestatareas_ejecutar_multiproducto': [detallesOperativa.firmaElectronicaMultiproductoAbandono],
      'cestatareas_resumen_multiproducto': [detallesOperativa.firmaElectronicaMultiproductoExito],

      //firma electronica fondos
      'cestatareas_ejecutar_fondos_despuestres': [detallesOperativa.firmaElectronicaFondosAbandono],
      'cestatareas_ejecutar_fondos': [detallesOperativa.firmaElectronicaFondosAbandono],
      'cestatareas_resumen_fondos': [detallesOperativa.firmaElectronicaFondosExito],

      //recargamovil
      'cuentas_recargamovil_paso1_cantidad': [detallesOperativa.recargaMovilAbandono],
      'cuentas_recargamovil_paso2_beneficiario': [detallesOperativa.recargaMovilAbandono],
      'cuentas_recargamovil_paso3_resumen': [detallesOperativa.recargaMovilAbandono],
      'cuentas_recargamovil_paso4_resultado': [detallesOperativa.recargaMovilExito],

      //transferencias
      'cuentas_transferencias_paso2_destinatario_transferencia': [
        detallesOperativa.transferenciaAbandono,
        detallesOperativa.traspasoAbandono
      ],
      'cuentas_transferencias_paso1_listado_operaciones_programadas': [
        detallesOperativa.transferenciaAbandono,
        detallesOperativa.traspasoAbandono
      ],
      'cuentas_transferencias_paso2_anulacion_transferencia': [detallesOperativa.transferenciaAbandono, detallesOperativa.traspasoAbandono],
      'cuentas_transferencias_paso3_importe': [detallesOperativa.transferenciaAbandono, detallesOperativa.traspasoAbandono],
      'cuentas_transferencias_paso4_resumen': [detallesOperativa.transferenciaAbandono, detallesOperativa.traspasoAbandono],
      'cuentas_transferencias_timeout_servicio': [detallesOperativa.transferenciaAbandono, detallesOperativa.traspasoAbandono],
      'cuentas_transferencias_paso5_resultado': [detallesOperativa.transferenciaExito, detallesOperativa.traspasoExito],

      //planesAportacionExtraordinaria
      'mostrarPaso0_pantallaIntermedia': [detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso1_origen': [detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso2_cantidad': [detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso_InformacionCampanya': [detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso3_resumen': [detallesOperativa.tarjetasRecargaMovilAbandono, detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso_vistaError': [detallesOperativa.planesAportacionExtraordinariaAbandono],
      'mostrarPaso5_resultado': [detallesOperativa.planesAportacionExtraordinariaExito],

      //tarjetasRecargaMovil
      'mostrarPaso1_cantidad': [detallesOperativa.tarjetasRecargaMovilAbandono],
      'mostrarPaso2_beneficiario': [detallesOperativa.tarjetasRecargaMovilAbandono],
      'mostrarPaso4_resultado': [detallesOperativa.tarjetasRecargaMovilExito],

      //valoresCompraventa
      'paso0_seleccionTipoOperacion': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso1_seleccionValor': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso2_informacionCondiciones': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso3_resumen': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'vista_comunicacion_experiencia_mifid': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'experiencia_mifid_vista_normativa': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'mifid_vista_normativa': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'mifid_vista_mostrar_test': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'mifid_vista_acuda_oficina': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'mifid_vista_mostrar_mensaje_resultado': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso_ampliacion_capital_inicio': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso_ampliacion_capital_resumen': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso_ampliacion_capital_confirmacion': [detallesOperativa.valoresCompraAbandono, detallesOperativa.valoresVentaAbandono],
      'paso4_confirmacion': [detallesOperativa.valoresCompraExito, detallesOperativa.valoresVentaExito],

      // contratacion
      'condicionesProductos_mostrarPaso0_modificacionCondiciones': [detallesOperativa.cuentasAbandono, detallesOperativa.depositosAbandono],
      'contratacionproductos_mostrarPaso2_documentacionYFirma': [detallesOperativa.cuentasAbandono, detallesOperativa.depositosAbandono],
      'contratacionproductos_mostrarPaso3_puestaEnVigor': [
        detallesOperativa.cuentasExito,
        detallesOperativa.planesExito,
        detallesOperativa.fondosExito,
        detallesOperativa.depositosExito,
        detallesOperativa.tarjetasDebitoExito,
        detallesOperativa.tarjetasPrepagoExito
      ],
      'mostrarPaso0_listarCuentasValores': [detallesOperativa.cuentasAbandono],
      'mostrarListaIntervinientes': [
        detallesOperativa.cuentasAbandono,
        detallesOperativa.fondosAbandono,
        detallesOperativa.planesAbandono,
        detallesOperativa.depositosAbandono
      ],
      'mostrarPaso0_cuentaAsociada': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'mostrarPaso1_seleccionAportacion': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'mostrarPaso2_cuentaBbvaOExterna': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'mostrarPaso7_preguntaAportacionPeriodica': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'mostrarPaso8_aportacionPeridica': [detallesOperativa.planesAbandono],
      'mostrarPaso9_campanyas': [
        detallesOperativa.planesAportacionExtraordinariaAbandono,
        detallesOperativa.planesAbandono,
        detallesOperativa.fondosAbandono,
        detallesOperativa.depositosAbandono
      ],
      'mostrarPaso_guardarDatos': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'condicionesProductos_mostrarPaso1_listarCuentasCargo': [detallesOperativa.depositosAbandono],
      'condicionesProductos_mostrarPaso2_listarCuentasAbono': [detallesOperativa.depositosAbandono],
      'mostrarPaso0_listarCuentas_liga': [detallesOperativa.tarjetasDebitoAbandono],
      'showStep_chooseTeams': [detallesOperativa.tarjetasDebitoAbandono],
      'mostrarPaso1_resumenCondiciones_liga': [detallesOperativa.tarjetasDebitoAbandono],
      'mostrarPaso0_listarCuentas': [detallesOperativa.tarjetasDebitoAbandono],
      'mostrarPaso1_resumenCondiciones': [detallesOperativa.tarjetasDebitoAbandono],
      'mostrarPaso_seleccionarFolleto' : [detallesOperativa.fondosAbandono],
      'contratacion_finContratacion': [
        detallesOperativa.tarjetasDebitoExito,
        detallesOperativa.cuentasExito,
        detallesOperativa.planesExito,
        detallesOperativa.fondosExito,
        detallesOperativa.depositosExito,
        detallesOperativa.tarjetasPrepagoExito
      ],
      'contratacion_ventaCruzada' :  [
        detallesOperativa.tarjetasDebitoExito,
        detallesOperativa.cuentasExito,
        detallesOperativa.planesExito,
        detallesOperativa.fondosExito,
        detallesOperativa.depositosExito,
        detallesOperativa.tarjetasPrepagoExito
      ],
      'contratacion_listadoProductosPendientes' : [
        detallesOperativa.tarjetasDebitoExito,
        detallesOperativa.cuentasExito,
        detallesOperativa.planesExito,
        detallesOperativa.fondosExito,
        detallesOperativa.depositosExito,
        detallesOperativa.tarjetasPrepagoExito
      ],
      'mostrarPaso0_seleccionarBeneficiario': [detallesOperativa.tarjetasPrepagoAbandono],
      'mostrarPaso1_cargarTarjeta': [detallesOperativa.tarjetasPrepagoAbandono],
      'mostrarPaso2_seleccionarCuenta': [detallesOperativa.tarjetasPrepagoAbandono],
      'mostrarPaso3_finalizarContratacion': [detallesOperativa.tarjetasPrepagoAbandono],
      'mostrarPaso0_seleccionarTarjetaVirtual': [detallesOperativa.tarjetasPrepagoAbandono],
      'mostrarPaso1_finalizarContratacionTarjetaVirtual': [detallesOperativa.tarjetasPrepagoAbandono],

      'devolverReciboDomiciliado': [detallesOperativa.recibosDevolucionAbandono],
      'devolverReciboDomiciliadoMensajeFinal': [detallesOperativa.recibosDevolucionExito],
      'planes_aportacionplanesjubilacion_paso1_intervinientes': [detallesOperativa.planesAbandono],
      'planes_aportacionplanesjubilacion_paso2_condiciones': [detallesOperativa.planesAbandono],
      'planes_aportacionplanesjubilacion_paso3_1_documentacion_firma': [detallesOperativa.planesAbandono],
      'planes_aportacionplanesjubilacion_paso3_2_documentacion_firma': [detallesOperativa.planesAbandono],
      'mostrarPaso5_fondoOPlanExterno': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      'mostrarPaso6_traspasoExterno': [detallesOperativa.planesAbandono, detallesOperativa.fondosAbandono],
      // ocl
      'mostrarPaso_informacionProductoOCL': [detallesOperativa.oclAbandono],
      'mostrarPaso_condicionesPrestamoOcl': [detallesOperativa.oclAbandono],
      'mostrarPaso_seleccionCuenta': [detallesOperativa.oclAbandono],
      'mostrarPaso_documentacionYFirma': [detallesOperativa.oclAbandono, detallesOperativa.oclAbandono2, detallesOperativa.oclExito],
      'mostrarPaso_puestaVigor': [detallesOperativa.oclExito],
      'monstrarPaso_finContratacion': [detallesOperativa.oclExito],
      // Pago de recibos no domiciliados
      'paso1_pagosnodomiciliados_busquedaEmisora': [detallesOperativa.pagoRecibosAbandono],
      'paso2_pagosnodomiciliados_pago': [detallesOperativa.pagoRecibosAbandono],
      'paso3_pagosnodomiciliados_resumen': [detallesOperativa.pagoRecibosAbandono],
      'paso4_pagosnodomiciliados_confirmacion': [detallesOperativa.pagoRecibosExito],
      //alta cita previa
      'citaprevia_paso1_tipo': [detallesOperativa.altaCitaPreviaAbandono],
      'citaprevia_paso2_asunto': [detallesOperativa.altaCitaPreviaAbandono],
      'citaprevia_paso3_fecha': [detallesOperativa.altaCitaPreviaAbandono],
      'citaprevia_paso4_confirmacion': [detallesOperativa.altaCitaPreviaAbandono],
      'citaprevia_paso5_resumen': [detallesOperativa.altaCitaPreviaExito],

      //alta cliente
      'mostrarPaso_Iberpay': [detallesOperativa.altaClienteAbandono]
    };

    this.additionalOpinatorResponse = [
    //FeedMockForm
	     {
        'id': 'steeeeeeeeeep',
        'businessCode': 'steeeeeeeeeep',
        'forms': [{
          'id': 'foooooooooorm',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/foooooooooorm?carry_formulario=foooooooooorm&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 3',
        'businessCode': 'step 3',
        'forms': [{
          'id': 'form_exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        },     {
	     		'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'planes-aportacion-final',
        'businessCode': 'planes-aportacion-final',
        'forms': [{
          'id': 'oc_financiacion_adeudo_exito_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_exito_web?carry_formulario=oc_financiacion_adeudo_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_exito_web?carry_formulario=oc_financiacion_adeudo_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'planes-aportacion',
        'businessCode': 'planes-aportacion',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'asdasg',
        'businessCode': 'asdasg',
        'forms': [{
          'id': 'qweqwe',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/qweqwe?carry_formulario=qweqwe&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'asdasdasd',
        'businessCode': 'asdasdasd',
        'forms': [{
          'id': 'sadsdasdad',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/sadsdasdad?carry_formulario=sadsdasdad&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 4',
        'businessCode': 'step 4',
        'forms': [{
          'id': 'form_exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'step 3',
        'businessCode': 'step 3',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 3',
        'businessCode': 'step 3',
        'forms': [{
          'id': 'form_exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step final',
        'businessCode': 'step final',
        'forms': [{
          'id': 'form_exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'step 3',
        'businessCode': 'step 3',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step1',
        'businessCode': 'step1',
        'forms': [{
          'id': 'form_abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_abandono?carry_formulario=form_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'qweqwe',
        'businessCode': 'qweqwe',
        'forms': [{
          'id': 'oc_financiacion_adeudo_abandono_web',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step exito',
        'businessCode': 'step exito',
        'forms': [{
          'id': 'form exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form exito?carry_formulario=form exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form exito?carry_formulario=form exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'step 3',
        'businessCode': 'step 3',
        'forms': [{
          'id': 'form abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form abandono?carry_formulario=form abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form abandono?carry_formulario=form abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form abandono',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form abandono?carry_formulario=form abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step x',
        'businessCode': 'step x',
        'forms': [{
          'id': 'form_exito',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }, {
           'type': {
             'id': 'pull'
            },
           'link': {
             'href': '//www.opinator.com/opi/form_exito?carry_formulario=form_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
          }
          ]
        }]
      },
	     {
        'id': 'step 2',
        'businessCode': 'step 2',
        'forms': [{
          'id': 'form 1',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form 1?carry_formulario=form 1&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
	     {
        'id': 'step 1',
        'businessCode': 'step 1',
        'forms': [{
          'id': 'form 1',
          'usePushMode': true,
          'links': [
     	          {
	     		'type': {
             'id': 'push'
            },
           'link': {
             'href': '//www.opinator.com/opi/form 1?carry_formulario=form 1&id=41719461C32226318F2015245&carry_lang=en&lang=en'
            }
        }
          ]
        }]
      },
    {
      'id': 'valorar_gestor_presencial',
      'businessCode': 'valorar_gestor_presencial',
      'forms': [{
        'id': 'valora_a_tu_gestor',
        'usePushMode': true,
        'links': [{
          'type': {
            'id': 'widget'
          },
          'link': {
            'href': '//www.opinator.com/opi/valora_a_tu_gestor?carry_formulario=valora_a_tu_gestor&id=556430E4FB09C102D92E266B7BC318907C046B442ECCE18C20D616B7D53F78CB&carry_lang=en&lang=en'
          }
        }],
        'scoring': 0
      }]
    }, {
      'id': 'valorar_gestor',
      'businessCode': 'valorar_gestor',
      'forms': [{
        'id': 'valora_a_tu_gestor',
        'usePushMode': true,
        'links': [{
          'type': {
            'id': 'widget'
          },
          'link': {
            'href': '//www.opinator.com/opi/valora_a_tu_gestor?carry_formulario=valora_a_tu_gestor&id=556430E4FB09C102D92E266B7BC318907C046B442ECCE18C20D616B7D53F78CB&carry_lang=en&lang=en'
          }
        }],
        'scoring': 0
      }]
    }, {
      "id": "cuentas-financiacion-movimiento",
      "businessCode": "cuentas-financiacion-movimiento",
      "forms": [{
        "id": "oc_financiacion_adeudo_abandono_web",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_financiacion_adeudo_abandono_web?carry_formulario=oc_financiacion_adeudo_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]
    }, {
      "id": "cuentas-financiacion-movimiento-final",
      "businessCode": "cuentas-financiacion-movimiento-final",
      "forms": [{
        "id": "oc_financiacion_adeudo_exito_web",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_financiacion_adeudo_exito_web?carry_formulario=oc_financiacion_adeudo_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }, {
          "type": {
            "id": "pull"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_financiacion_adeudo_exito_web?carry_formulario=oc_financiacion_adeudo_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]
    } , {
      "id": "cestatareas_ejecutar_consumo",
      "businessCode": "cestatareas_ejecutar_consumo",
      "forms": [{
        "id": "push_firmaelectronica_net_abandono",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/push_firmaelectronica_net_abandono?carry_formulario=push_firmaelectronica_net_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]

    }, {
      "id": "cestatareas_resumen_consumo",
      "businessCode": "cestatareas_resumen_consumo",
      "forms": [{
        "id": "pull_push_firmadiferida_net_exito",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/pull_push_firmadiferida_net_exito?carry_formulario=pull_push_firmadiferida_net_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }, {
          "type": {
            "id": "pull"
          },
          "link": {
            "href": "//www.opinator.com/opi/pull_push_firmadiferida_net_exito?carry_formulario=pull_push_firmadiferida_net_exito&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]
    }, {
      "id": "traspaso-tarjeta-cuenta",
      "businessCode": "traspaso-tarjeta-cuenta",
      "forms": [{
        "id": "oc_traspaso_a_cuenta_abandono_web",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_traspaso_a_cuenta_abandono_web?carry_formulario=oc_traspaso_a_cuenta_abandono_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]
    }, {
      "id": "traspaso-tarjeta-cuenta-final",
      "businessCode": "traspaso-tarjeta-cuenta-final",
      "forms": [{
        "id": "oc_traspaso_a_cuenta_exito_web",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_traspaso_a_cuenta_exito_web?carry_formulario=oc_traspaso_a_cuenta_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }, {
          "type": {
            "id": "pull"
          },
          "link": {
            "href": "//www.opinator.com/opi/oc_traspaso_a_cuenta_exito_web?carry_formulario=oc_traspaso_a_cuenta_exito_web&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]
    }, {
      "id": "seguros_auto_mostrar_productos",
      "businessCode": "seguros_auto_mostrar_productos",
      "forms": [{
        "id": "push_firmaelectronica_net_abandono",
        "usePushMode": true,
        "links": [{
          "type": {
            "id": "push"
          },
          "link": {
            "href": "//www.opinator.com/opi/push_firmaelectronica_net_abandono?carry_formulario=push_firmaelectronica_net_abandono&id=41719461C32226318F2015245&carry_lang=en&lang=en"
          }
        }]
      }]

    }
    
    ];

    this.mockResponse = [];
    return this;
  };

  $B.app.FeedbackConf = FeedbackConf;
  return $B.app.FeedbackConf;
}());