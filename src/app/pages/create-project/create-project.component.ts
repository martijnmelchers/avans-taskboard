import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private _project: ProjectService, private _snack: MatSnackBar, private _router: Router) {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  ngOnInit(): void {
  }


  async createProject(data: FormData) {
    try {
      const project = await this._project.createProject(data);
      this._snack.open(`Project successfully created!`, 'OK', { duration: 2000 });
      await this._router.navigate(['projects', project.id]);

    } catch (e) {
      console.error(e);
    }
  }

}
