package com.oreuda.api.domain.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class UserLog {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "user_log_id")
	private Long id;

	// 사용자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@NotNull
	private User user;

	// 사용자 로그 일시
	@NotNull
	@Column(name = "user_log_time")
	private LocalDateTime time;

	// 사용자 로그 값
	@NotNull
	@Column(name = "user_log_val")
	private int val;

	public UserLog() {
	}

}
