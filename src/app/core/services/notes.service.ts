import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteData } from '../interfaces/note-data';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }

  addNoteApi(newNote:NoteData):Observable<any>
  {
    return this._HttpClient.post(environment.noteUrl , newNote , 
     {
      headers:{
        token:localStorage.getItem('token') || ''
      } 
     }
      )
  } ;

  
  getUserNoteApi():Observable<any>
  {
    return this._HttpClient.get(environment.noteUrl  , 
    {
      headers:{
        token:localStorage.getItem('token') || ''
      } 
     })
  } ;



  deleteUserNoteApi(noteID:string):Observable<any>
  {
    return this._HttpClient.delete(`${environment.noteUrl}${noteID}`  , 
    {
      headers:{
        token:localStorage.getItem('token') || ''
      } 
     })
  } ;


  updateUserNoteApi(newNote:NoteData , noteId : string):Observable<any>
  {
    return this._HttpClient.put(`${environment.noteUrl}${noteId}`, newNote  , 
    {
      headers:{
        token:localStorage.getItem('token') || ''
      } 
     })
  } ;




}
