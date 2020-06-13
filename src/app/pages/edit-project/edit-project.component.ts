import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  private projectSubscription: Subscription;
  project: Project;

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private _project: ProjectService, private _snack: MatSnackBar, private _router: Router, private _route: ActivatedRoute) {
    this.projectForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });


    this.projectSubscription = this._route.params.subscribe((params) => {
      this._project.getProjectsCombined().subscribe((projects) => {
        this.project = projects.find((proj) => proj.id === params.project);

        this.name.setValue(this.project.name);
        this.description.setValue(this.project.description);


      });
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


  async updateProject(data: FormData) {
    try {
      const editProj = await this._project.editProject(this.project.id, data);
      this._snack.open(`Project successfully created!`, 'OK', { duration: 2000 });
      await this._router.navigate(['projects', this.project.id]);

    } catch (e) {
      console.error(e);
    }
  }

}
