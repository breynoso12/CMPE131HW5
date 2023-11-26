// testWeatherStation.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./weatherapplication');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Weather Station', () => {
  it('Checking if it starts up', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Weather application');
        done();
      });
  });

  it('Checking to see if it can access weather data', (done) => {
    const data = { city: 'London' };

    chai.request(app)
      .post('/collect_data')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ status: 'success' });
        done();
      });
  });

  it('Test to see if it can retrieve weather data', (done) => {
    chai.request(app)
      .get('/get_data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('temperature');
        expect(res.body).to.have.property('humidity');
        expect(res.body).to.have.property('pressure');
        done();
      });
  });

  it('Dealing with "no data" error', (done) => {
    chai.request(app)
      .get('/get_data')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: 'Error: no data available.' });
        done();
      });
  });
});
