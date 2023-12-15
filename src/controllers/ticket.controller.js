import ticketModel from "../models/ticket.model.js";

async function postTicket(request, response) {
    try {
      const body = request.body;
  
      const ticket = await ticketModel.create({
        user: body.user,
        subject: body.subject,
        message: body.message,
        state: body.state,
      });
  
      return response.send({ ticket });
    } catch (error) {
      response.status(500).send({ error });
    }
  }

  export {postTicket}