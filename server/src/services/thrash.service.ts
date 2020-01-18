import { Request, Response } from 'express';

import { Thrash } from '../models/thrash.model';
import { WELCOME_MESSAGE } from '../constants/constants';


export const welcomeMessage = (req: Request, res: Response) => {
  res.status(200).send(WELCOME_MESSAGE);
}

export const getAllThrash = (req: Request, res: Response) =>  {
  Thrash.find({}, (error: Error, thrash: any) => {
    if (error) {
      res.send(error);
    }
    res.json(thrash);
  });
}

export const addNewThrash = (req: Request, res: Response) => {
  const newThrash = new Thrash(req.body);
  newThrash.save((error: Error, thrash: any) => {
    if (error) {
      res.send(error);
    }
    res.json(thrash);
  });
}

export const deleteThrash = (req: Request, res: Response) =>  {
  const thrashId = req.params.id;
  Thrash.findByIdAndDelete(thrashId, (error: Error, deleted: any) => {
    if (error) {
      res.send(error);
    }
    const message = deleted ? 'Deleted successfully' : 'Thrash not found :(';
    res.status(200).send(message);
  });
}

export const updateThrash = (req: Request, res: Response) =>  {
  const thrashId = req.params.id;
  Thrash.findByIdAndUpdate(
    thrashId,
    req.body,
    (error: Error, thrash: any) => {
      if (error) {
        res.send(error);
      }
      const message = thrash
        ? 'Updated successfully'
        : 'Thrash not found :(';
      res.send(message);
    }
  );
}

