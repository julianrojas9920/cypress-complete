describe('Restful Booker - Booking API', () => {

  let bookingId
  let API_URL
  let token

  before(() => {
    cy.getBookingToken().then((tkn) => {
      token = tkn
      cy.log('Token: ' + token)
    })
    
    cy.env(['API_URL']).then(({ API_URL: url }) => {
      API_URL = url
    })
  })

  context('GET /booking', () => {

    it('TC01 - Obtener todos los bookings', () => {
      cy.request({
        method: 'GET',
        url:    `${API_URL}/booking`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
      })
    })

    it('TC02 - Filtrar bookings por nombre', () => {
      cy.fixture('bookings').then((bookings) => {
        cy.request({
          method: 'GET',
          url:    `${API_URL}/booking`,
          qs: {
            firstname: bookings.newBooking.firstname,
            lastname:  bookings.newBooking.lastname,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
        })
      })
    })

  })

  context('POST /booking', () => {

    it('TC03 - Crear un nuevo booking', () => {
      cy.fixture('bookings').then((bookings) => {
        cy.request({
          method:  'POST',
          url:     `${API_URL}/booking`,
          headers: { 'Content-Type': 'application/json' },
          body:    bookings.newBooking,
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('bookingid')
          expect(response.body.booking.firstname).to.eq(bookings.newBooking.firstname)
          expect(response.body.booking.totalprice).to.eq(bookings.newBooking.totalprice)
          bookingId = response.body.bookingid
          console.log('Booking ID creado: ' + bookingId)
        })
      })
    })

  })

  context('GET /booking/:id', () => {

    it('TC04 - Obtener booking por ID', () => {
      cy.request({
        method: 'GET',
        url:    `${API_URL}/booking/${bookingId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('firstname')
        expect(response.body).to.have.property('lastname')
        expect(response.body).to.have.property('totalprice')
      })
    })

  })

  context('PUT /booking/:id', () => {

    it('TC05 - Actualizar booking completo', () => {
      cy.fixture('bookings').then((bookings) => {
        cy.request({
          method:  'PUT',
          url:     `${API_URL}/booking/${bookingId}`,
          headers: {
            'Content-Type': 'application/json',
            'Cookie':       `token=${token}`,
          },
          body: bookings.updatedBooking,
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.firstname).to.eq(bookings.updatedBooking.firstname)
          expect(response.body.totalprice).to.eq(bookings.updatedBooking.totalprice)
        })
      })
    })

  })

  context('DELETE /booking/:id', () => {

    it('TC06 - Eliminar booking', () => {
      cy.request({
        method:  'DELETE',
        url:     `${API_URL}/booking/${bookingId}`,
        headers: {
          'Cookie': `token=${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })

    it('TC07 - Verificar que el booking fue eliminado', () => {
      cy.request({
        method:   'GET',
        url:      `${API_URL}/booking/${bookingId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

  })

})