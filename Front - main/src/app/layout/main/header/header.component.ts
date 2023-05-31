import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	entriesRouter: String = '';
	public windowWidth: any = window.innerWidth;
	public user: any;
	public userRole: string = '';

	constructor(private offcanvasService: NgbOffcanvas, private router: Router) {}

	ngOnInit(): void {
		this.user = localStorage.getItem('user');
        if (this.user) {
			this.user = JSON.parse(this.user);
			this.userRole = String(this.user.user.role).toLowerCase();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.windowWidth = event.target.innerWidth;
	}
  
  	open(content: any) {
		let currentCourse = localStorage.getItem('currentCourse');
		if(currentCourse) {
			this.entriesRouter = 'entries/student-entries';
		} else {
			this.entriesRouter = 'entries/course-entries';
		}
		this.offcanvasService.open(content);
	}


	logout() {
		this.router.navigateByUrl(`/login`).then(() => {
			localStorage.clear();
		});
	}
}
