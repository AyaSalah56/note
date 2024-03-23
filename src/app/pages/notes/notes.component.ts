import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NotesService } from 'src/app/core/services/notes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit  {
  allNotes:NoteData[]=[]  ;
  searchPipe:string='' ;
  constructor(public dialog: MatDialog , private _NotesService:NotesService , private _ToastrService:ToastrService) {}

  ngOnInit(): void {
    this._NotesService.getUserNoteApi().subscribe({
      next:(res)=>{
          console.log(res);
          if(res.msg === 'done')
          {
            this.allNotes = res.notes
          }
      } ,

      error:(err) =>{
            this. allNotes = [] ; 
      }
    })
  }

  openDialog(noteData?:NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      data:{title:noteData?.title , content:noteData?.content , _id:noteData?._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
      
     
    });
  }

  deleteNote(deletedNote:string, noteIndex:number)
  {
    console.log(deletedNote,noteIndex);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this._NotesService.deleteUserNoteApi(deletedNote).subscribe({
            next:(res)=>{
              console.log(res);
              this.ngOnInit() 
              this._ToastrService.success('the note is deleted successfully')
             
            }
          })
        });
      }
    });
    
  }


  updateNote(notes:NoteData , index:number)
  {
    console.log(notes , index);
    this.openDialog({title:notes.title , content:notes.content , _id:notes._id})
    
  }
}
